import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'category'
})
export class CategoryPipe implements PipeTransform {
    transform(items: Array<any>,nameSearch: string, addressSearch: string, companySearch: string) {
        if(items && items.length) {
            return items.filter(item => {
                console.log(nameSearch && item.name.toLowerCase().indexOf(nameSearch.toLocaleUpperCase()));
                if(nameSearch && item.name.toLowerCase().indexOf(nameSearch.toLowerCase()) === -1) {
                    return false;
                }
                if(addressSearch && item.address.toLowerCase().indexOf(addressSearch.toLowerCase()) === -1) {
                    return false;
                }
                if(companySearch && item.company.toLowerCase().indexOf(companySearch.toLowerCase()) === -1) {
                    return false;
                }
                return true;
            })
        } else {
            return items;
        }
    }
}