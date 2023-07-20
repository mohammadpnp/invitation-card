<?php

namespace App\Http\Controllers\InvitationCard;

use App\Http\Requests\InvitationCard\CreatePaperCardRequest;
use App\Http\Requests\InvitationCard\SubmitSurveyRequest;
use App\Http\Requests\InvitationCard\UpdatePaperCardRequest;
use App\Http\Requests\InvitationCard\UpdateWeddingCardRequest;
use App\Models\CardAttachment;
use App\Models\Description;
use App\Models\FairPlace;
use App\Models\PaperCard;
use App\Models\Survey;
//use ZanySoft\LaravelPDF\PDF;
use Str;
use App\Models\User;
use App\Models\WeddingCard;
use Illuminate\Http\Request;
use Morilog\Jalali\Jalalian;
use App\Models\InvitationCard;
use Illuminate\Support\Facades\App;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\InvitationCard\CreateWeddingCardRequest;

class InvitationCardController extends Controller
{
    public function index()
    {
        $data = InvitationCard::where('user_id', Auth::id())->get();

        return view('invitation_card.index', compact('data'));
    }


    public function create(Request $request)
    {

        if ($request->card == WeddingCard::class) {
            $fairs = FairPlace::all();
            $descriptions = Description::all();
            return view('invitation_card.create_wedding_cards',compact('fairs' , 'descriptions'));

        }elseif ($request->card == PaperCard::class){
            return view('invitation_card.create_paper_cards');
        } else {
            return redirect()->back()->withErrors('عملیات ناموفق بود.');
        }
    }
    public function weddingStore(CreateWeddingCardRequest $request)
    {
        $data = $request->validated();

        $card = InvitationCard::create([
            'user_id' => Auth::id(),
            'title' => $data['title'],
            'url' => $this->generateUrlCode(),
            'status' => InvitationCard::CREATED_STATUS,
            'card_type' => WeddingCard::class,
        ]);

        $startedAt = $data['start_date'].' '.$data['start_time'];
        $finishedAt = $data['finish_date'].' '.$data['finish_time'];

        $startedAt = Jalalian::fromFormat('Y-m-d H:i', $startedAt)->toCarbon()->toDateTimeString();
        $finishedAt = Jalalian::fromFormat('Y-m-d H:i', $finishedAt)->toCarbon()->toDateTimeString();

        $weddingCard = WeddingCard::create([
            'card_id' => $card->id,
            'title' => $data['title'],
            'started_at' => $startedAt,
            'finished_at' => $finishedAt,
            'description' => $data['description'],
            'address' => $data['address'],
            'lat' => $data['lat'],
            'lng' => $data['lng'],
            'have_survey' => $data['have_survey'],
            'slogan' => $data['slogan'] ?? null,
            'brand' => $data['brand'],
            'instagram_link' => $data['instagram_link'],
            'website_link' => $data['website_link'],
            'youtube_link' => $data['youtube_link'],
            'description_header' => $data['description_header'],
            'description_footer' => $data['description_header'],
            'province' => $data['province'],
            'city' => $data['city'],
            'saloon' => $data['saloon'],
            'booth' => $data['booth'],
            'have_poem' => $data['have_poem'],
            'fair_id' => $data['fair_id'],
        ]);

        $this->savePicture1($request, $weddingCard);
        $this->savePicture2($request, $weddingCard);
        $this->savePicture3($request, $weddingCard);
        $this->savePicture4($request, $weddingCard);
        $this->saveLogo($request, $weddingCard);
        $this->saveManagerPhoto($request, $weddingCard);
        $this->savePoster($request, $weddingCard);

        $card->update(['card_id' => $weddingCard->id]);

        return redirect()->route('invitation-card.index')->with('message', 'عملیات با موفقیت انجام شد .');
    }

    public function paperStore(CreatePaperCardRequest $request)
    {
        $data = $request->validated();

        $card = InvitationCard::create([
            'user_id' => Auth::id(),
            'title' => $data['title'],
            'url' => $this->generateUrlCode(),
            'status' => InvitationCard::CREATED_STATUS,
            'card_type' => PaperCard::class,
        ]);

        $startedAt = Jalalian::fromFormat('Y-m-d H:i', $data['started_at'])->toCarbon()->toDateTimeString();
        $finishedAt = Jalalian::fromFormat('Y-m-d H:i', $data['finished_at'])->toCarbon()->toDateTimeString();

        $paperCard = PaperCard::create([
            'card_id' => $card->id,
            'title' => $data['title'],
            'started_at' => $startedAt,
            'finished_at' => $finishedAt,
            'text' => $data['text'],
            'address' => $data['address'],
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'gender' => $data['gender'],
        ]);

        $card->update(['card_id' => $paperCard->id]);

        return redirect()->route('invitation-card.index')->with('message', 'عملیات با موفقیت انجام شد .');

    }


    public function show($url)
    {
        $invitationCard = InvitationCard::where('url', $url)
            ->with(['card.pictures','card.fair'])
            ->first();
        if (!$invitationCard)
            return redirect()->back()->withErrors('کارت یافت نشد');

        if ($invitationCard->card_type == WeddingCard::class) {

            $pictures = [];

            foreach ($invitationCard->card->pictures as $picture){
                $pictures[] = Storage::disk('wedding_card_picturs')->url($picture->link);
            }

            return response()->json([
                'pictures' => $pictures,
                'title' => $invitationCard->card->title,
                'started_at' => $invitationCard->card->started_at ,
                'finished_at' => $invitationCard->card->finished_at ,
                'description' => $invitationCard->card->description ,
                'description_header' => $invitationCard->card->description_header ,
                'description_footer' => $invitationCard->card->description_footer ,
                'address' => $invitationCard->card->address ,
                'lat' => $invitationCard->card->lat ,
                'lng' => $invitationCard->card->lng ,
                'have_survey' => $invitationCard->card->have_survey ,
                'logo' => $invitationCard->card->logo_url ,
                'slogan' => $invitationCard->card->slogan ,
                'brand' => $invitationCard->card->brand ,
                'instagram_link' => $invitationCard->card->instagram_link ,
                'website_link' => $invitationCard->card->website_link ,
                'youtube_link' => $invitationCard->card->youtube_link ,
                'poster' => $invitationCard->card->poster_url ,
                'manager_photo' => $invitationCard->card->manager_photo_url ,
                'province' => $invitationCard->card->province ,
                'city' => $invitationCard->card->city ,
                'fair' => $invitationCard->card->fair->name ,
                'saloon' => $invitationCard->card->saloon ,
                'booth' => $invitationCard->card->booth ,
                'have_poem' => $invitationCard->card->have_poem ,
            ]);


        }elseif($invitationCard->card_type == PaperCard::class) {
            return view('invitation_card.show_paper_card', compact('invitationCard'));
        } else {
            return redirect()->back()->withErrors('کارت نامعتبر است');
        }
    }

    public function showCardToUser($url)
    {
        $invitationCard = InvitationCard::where('url', $url)
            ->with('card')
            ->first();
        if (!$invitationCard)
            return redirect()->back()->withErrors('کارت یافت نشد');

        $survey = Survey::where('card_id',$invitationCard->id)
            ->where('user_id',session('user'))
            ->first();
        if (!$survey){
            Survey::create([
                'user_id' => session('user'),
                'card_id' => $invitationCard->id,
            ]);
        }

        if ($invitationCard->card_type == WeddingCard::class) {
            return view('invitation_card.show_wedding_card', compact('invitationCard'));
        } else {
            return redirect()->back()->withErrors('کارت نامعتبر است');
        }
    }

    public function edit($id)
    {
        $card = InvitationCard::with('card')->find($id);
        if (!$card)
            return redirect()->back()->withErrors('کارت یافت نشد');

        return view('invitation_card.edit_wedding_cards',compact('card'));
    }

    public function update($id , UpdateWeddingCardRequest $request)
    {
        $data = $request->validated();
        $card = InvitationCard::with('card')->find($id);
        if (!$card)
            return redirect()->back()->withErrors('کارت یافت نشد');

        $startedAt = Jalalian::fromFormat('Y-m-d H:i', $data['started_at'])->toCarbon()->toDateTimeString();
        $finishedAt = Jalalian::fromFormat('Y-m-d H:i', $data['finished_at'])->toCarbon()->toDateTimeString();


        $card->card->update([
            'title' => $data['title'],
            'started_at' => $startedAt,
            'finished_at' => $finishedAt,
            'description' => $data['description'],
            'address' => $data['address'],
            'lat' => $data['lat'],
            'lng' => $data['lng'],
            'have_survey' => $data['have_survey'],
        ]);

        $this->savePicture1($request, $card->card);

        if($card->status == InvitationCard::CONFIRMED_STATUS)
            $card->update(['status' => InvitationCard::WAITING_EDIT_CONFIRM_STATUS]);

        return redirect()->route('invitation-card.index')->with('message', 'عملیات با موفقیت انجام شد .');
    }

    public function paperEdit($id)
    {
        $card = InvitationCard::with('card')->find($id);
        if (!$card)
            return redirect()->back()->withErrors('کارت یافت نشد');

        return view('invitation_card.edit_paper_cards',compact('card'));
    }

    public function paperUpdate(UpdatePaperCardRequest $request,$id)
    {
        $data = $request->validated();
        $card = InvitationCard::with('card')->find($id);
        if (!$card)
            return redirect()->back()->withErrors('کارت یافت نشد');

        $startedAt = Jalalian::fromFormat('Y-m-d H:i', $data['started_at'])->toCarbon()->toDateTimeString();
        $finishedAt = Jalalian::fromFormat('Y-m-d H:i', $data['finished_at'])->toCarbon()->toDateTimeString();


        $card->card->update([
            'title' => $data['title'],
            'started_at' => $startedAt,
            'finished_at' => $finishedAt,
            'text' => $data['text'],
            'address' => $data['address'],
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'gender' => $data['gender'],
        ]);

        if($card->status == InvitationCard::CONFIRMED_STATUS)
            $card->update(['status' => InvitationCard::WAITING_EDIT_CONFIRM_STATUS]);

        return redirect()->route('invitation-card.index')->with('message', 'عملیات با موفقیت انجام شد .');

    }

    public function destroyWedding ($id){

        $card = InvitationCard::find($id);
        if (!$card)
            return redirect()->back()->withErrors('کارت یافت نشد');

        $card->card()->delete();
        $card->delete();

        return redirect()->route('invitation-card.index')->with('message', 'عملیات با موفقیت انجام شد .');
    }

    public function confirmRequest($id)
    {
        $card = InvitationCard::find($id);
        if (!$card)
            return redirect()->back()->withErrors('کارت یافت نشد');

        $card->update(['status' => InvitationCard::WAITING_CONFIRM_STATUS]);

        return redirect()->route('invitation-card.index')->with('message', 'عملیات با موفقیت انجام شد .');
    }


    public function submitSurvey(SubmitSurveyRequest $request ,$cardId)
    {
        $data = $request->validated();
        $card = InvitationCard::find($cardId);

        if (!session('user') || !$card)
            abort(404);

        $survey = Survey::where('card_id',$cardId)
            ->where('user_id',session('user'))
            ->first();

        if ($data['come_datetime'])
            $come = Jalalian::fromFormat('Y-m-d H:i', $data['come_datetime'])->toCarbon()->toDateTimeString();

        $survey->update([
            'is_participate' => $data['is_participate'],
            'come_datetime' => $come ?? null,
            'note' => $data['note'] ?? null
        ]);

        return redirect()->back()->with('message', 'عملیات با موفقیت انجام شد .');
    }

    public function showSurvey($id)
    {
        $card = InvitationCard::with('surveys.user')->find($id);

        if (!$card)
            return redirect()->back()->withErrors('کارت یافت نشد');

        return view('invitation_card.survey',compact('card'));

    }


//    public function show($url){
//
//        $invitationCard = InvitationCard::where('url', $url)
//        ->with('card')
//        ->first();
//        if(!$invitationCard)
//            return redirect()->back()->withErrors('کارت یافت نشد');
//
//        if($invitationCard->card_type == WeddingCard::class){
//            return view('invitation_card.show_wedding_card',compact('invitationCard'));
//        }else{
//            return redirect()->back()->withErrors('کارت نامعتبر است');
//        }
//
//    }


    private function generateUrlCode()
    {
        do {
            $url = time() . Auth::id();
            $card = InvitationCard::where([
                'url' => $url
            ])
                ->first();
        } while ($card);

        return $url;
    }

    private function savePicture1($request, $card)
    {
        $storage = Storage::disk('card_attachment');

        if ($request->hasFile('file1')) {
            $file = $request->file('file1');
            if ($file->isValid()) {
                $path = date('Y/m/d');
                $extension = $file->getClientOriginalExtension();
                $name = Str::random(26) . rand(10000, 999999) . '.' . $extension;
                $fullPath = $storage->putFileAs($path, $file, $name);

                CardAttachment::create([
                    'link' => $fullPath,
                    'card_type' => WeddingCard::class,
                    'card_id' => $card->id
                ]);
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    private function savePicture2($request, $card)
    {
        $storage = Storage::disk('card_attachment');

        if ($request->hasFile('file2')) {
            $file = $request->file('file2');
            if ($file->isValid()) {
                $path = date('Y/m/d');
                $extension = $file->getClientOriginalExtension();
                $name = Str::random(26) . rand(10000, 999999) . '.' . $extension;
                $fullPath = $storage->putFileAs($path, $file, $name);

                CardAttachment::create([
                    'link' => $fullPath,
                    'card_type' => WeddingCard::class,
                    'card_id' => $card->id
                ]);
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    private function savePicture3($request, $card)
    {
        $storage = Storage::disk('card_attachment');

        if ($request->hasFile('file3')) {
            $file = $request->file('file3');
            if ($file->isValid()) {
                $path = date('Y/m/d');
                $extension = $file->getClientOriginalExtension();
                $name = Str::random(26) . rand(10000, 999999) . '.' . $extension;
                $fullPath = $storage->putFileAs($path, $file, $name);

                CardAttachment::create([
                    'link' => $fullPath,
                    'card_type' => WeddingCard::class,
                    'card_id' => $card->id
                ]);
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    private function savePicture4($request, $card)
    {
        $storage = Storage::disk('card_attachment');

        if ($request->hasFile('file4')) {
            $file = $request->file('file4');
            if ($file->isValid()) {
                $path = date('Y/m/d');
                $extension = $file->getClientOriginalExtension();
                $name = Str::random(26) . rand(10000, 999999) . '.' . $extension;
                $fullPath = $storage->putFileAs($path, $file, $name);

                CardAttachment::create([
                    'link' => $fullPath,
                    'card_type' => WeddingCard::class,
                    'card_id' => $card->id
                ]);
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    private function saveLogo($request, $card)
    {
        $storage = Storage::disk('wedding_card_picturs');

        if ($request->hasFile('logo')) {
            $file = $request->file('logo');
            if ($file->isValid()) {
                $path = date('Y/m/d');
                $extension = $file->getClientOriginalExtension();
                $name = Str::random(26) . rand(10000, 999999) . '.' . $extension;
                $fullPath = $storage->putFileAs($path, $file, $name);

                $card->update([
                    'logo' => $fullPath,
                ]);
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    private function saveManagerPhoto($request, $card)
    {
        $storage = Storage::disk('wedding_card_picturs');

        if ($request->hasFile('manager_photo')) {
            $file = $request->file('manager_photo');
            if ($file->isValid()) {
                $path = date('Y/m/d');
                $extension = $file->getClientOriginalExtension();
                $name = Str::random(26) . rand(10000, 999999) . '.' . $extension;
                $fullPath = $storage->putFileAs($path, $file, $name);

                $card->update([
                    'manager_photo' => $fullPath,
                ]);
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    private function savePoster($request, $card)
    {
        $storage = Storage::disk('wedding_card_picturs');

        if ($request->hasFile('poster')) {
            $file = $request->file('poster');
            if ($file->isValid()) {
                $path = date('Y/m/d');
                $extension = $file->getClientOriginalExtension();
                $name = Str::random(26) . rand(10000, 999999) . '.' . $extension;
                $fullPath = $storage->putFileAs($path, $file, $name);

                $card->update([
                    'poster' => $fullPath,
                ]);
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

//    public function exportPaperCardPdf($url)
//    {
//        $invitationCard = InvitationCard::where('url', $url)
//            ->with('card')
//            ->first();
//        if (!$invitationCard)
//            return redirect()->back()->withErrors('کارت یافت نشد');
//
//        $pdf = new PDF();
//        $pdf->loadView('invitation_card.show_paper_card', compact('invitationCard'));
//
//        return $pdf->stream(time().'-'.$invitationCard->card->first_name.'-'.$invitationCard->card->last_name.'.pdf');
//    }
}
