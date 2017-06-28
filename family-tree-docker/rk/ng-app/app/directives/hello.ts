import {Directive, Input, ElementRef, Renderer} from "angular2/core";

@Directive({
	selector: '[hello]',
	host: {
	     '(click)' : 'doClick()',
	}
})
 
export class Hello {
	doClick(){
		alert('hello');
	}
};