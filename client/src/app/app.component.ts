import { Component, HostBinding, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemingService } from './core/theming.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import { NikudimService } from './core/nikudim.service';
import { splitNikudsAndNotNikuds, splitWholeNikuds, vowels, setDraft, isSin} from 'src/app/core/helpers'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {
  themingSubscription: Subscription;

  constructor(
    private theming: ThemingService,
    private nikidumService: NikudimService
    ) { }

  @HostBinding('class') public cssClass;

  draft = `ברוכים הבאים לנִקֻּדַהּ!
  לחצו על המלים כאן וראו כיצד הן משתנות.
  לעזרה נסו את הצרוף ctrl+shift+י'.
  שמוש מצלח!`;
  vowels = vowels
  drafts = [];
  nikudABRegExp = /[אבגדהוזחטיכךלמםנןסעפףצץקרשתְֱֲֳִֵֶַָֹֻּׁׂ]/g;
  notNikudABRegExp = /[^אבגדהוזחטיכךלמםנןסעפףצץקרשתְֱֲֳִֵֶַָֹֻּׁׂ]/g;
  selectedNaked =''
  selectedNikidums = []
  selectedNikuds = []
  selectedIndex:number
  showSinVowel = true

  mainNikuds = []
  myControl = new FormControl();
  textarreaControl = new FormControl();
  filteredOptions: Observable<string[]>;
  userWord = []

  nikuds = []

  ngOnInit() {
    this.themingSubscription = this.theming.theme.subscribe(theme => {this.cssClass = theme;});
    this.initSuggestController()
    this.initTextAreaConroller()
  }

  ngOnDestroy() {
    this.themingSubscription.unsubscribe();
  }

  initTextAreaConroller(){
    this.textarreaControl.valueChanges.subscribe(value => {
    this.mainNikuds = null
    let _payload = splitNikudsAndNotNikuds(value, this.nikudABRegExp, this.notNikudABRegExp)

     this.nikidumService.naked(_payload).subscribe(val =>{
       this.mainNikuds = val
     })
    })

    this.textarreaControl.setValue(this.draft)
  }

  initSuggestController(){
    this.myControl.valueChanges.subscribe(nikud => {
      this.filteredOptions = this.nikidumService.suggest(nikud)
      this.filteredOptions.subscribe(niks => {

      })
    })
  }

  private selectSuggestion(w){
    this.selectedNaked = w
    this.nikidumService.naked([[w]]).subscribe(nakeds =>{
      this.selectedNikidums = nakeds[0][0]['Nikudim']
    })
  }

  private setWord(nikud, nikidums){
    this.myControl.setValue(nikud.Naked)
    this.selectedNaked = nikud.Naked
    this.selectedNikidums = nikud.Nikudim
  }

  private selectNikud(nikud){
    this.selectedNikuds = splitWholeNikuds(nikud)
  }
 
  private selectLetter(index:number){
    this.selectedIndex = index
    this.showSinVowel = isSin(this.selectedNikuds[index])
  }

  private insertDraft(vowel){
    let letter = this.selectedNikuds[this.selectedIndex]
    let changed = setDraft(letter, vowel)
    this.selectedNikuds[this.selectedIndex] = changed
  }

  private addWord(){
    this.userWord.push(this.selectedNikuds.join(''))
  }
}
