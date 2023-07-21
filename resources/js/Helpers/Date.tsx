export default class DateHelper {
	private static makeDate(date_time: string): Date {
		return new Date(date_time);
	}
	
	public static formatDate(date_time: string): string {
		return this.makeDate(date_time).toLocaleDateString('fa', {
			year : 'numeric',
			month: 'short',
			day  : 'numeric',
		});
	}
	
	public static getDifferent(date: string): number {
		const time = this.makeDate(date).getTime();
		
		return Math.round((new Date().getTime() - time) / 1000);
	}
	
	public static isPast(date: string) {
		return this.getDifferent(date) >= 0;
	}
	
	public static dateForHumans(date: string): string {
		const human_date = true;
		
		if (human_date) {
			const different_time          = this.getDifferent(date);
			const different_time_absolute = Math.abs(different_time);
			
			const names: { [key: number]: string } = {};
			names[1]                               = 'ثانیه';
			names[60]                              = 'دقیقه';
			names[60 * 60]                         = 'ساعت';
			names[24 * 60 * 60]                    = 'روز';
			names[7 * 24 * 60 * 60]                = 'هفته';
			names[30 * 24 * 60 * 60]               = 'ماه';
			names[365 * 24 * 60 * 60]              = 'سال';
			
			let i = 0;
			
			const entries = Object.entries(names).reverse();
			
			for (const [key, name] of entries) {
				const seconds: number                          = Number(key);
				const next_entry: [string, string] | undefined = entries[i + 2] ? entries[i + 2] : entries[i + 1];
				const next_seconds: number                     = Number(next_entry ? next_entry[0] : 0);
				const different_seconds: number                = different_time_absolute / (seconds - next_seconds);
				
				if (different_seconds >= 1) {
					let round = Math.round(different_time_absolute / seconds);
					
					return `
						${this.formatNumber(round)}
						${name}
						${different_time >= 0 ? 'پیش' : 'مانده'}
					`;
				}
				
				i++;
			}
			
			return 'همین حالا';
		}
		
		return this.formatDate(date);
	}
	
	public static formatNumber(number: string | number): string {
		return Number(number).toLocaleString('fa');
	}
}
