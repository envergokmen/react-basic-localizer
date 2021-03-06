# react-basic-localizer

### A basic localization class for react

---

#### Usage

Firs load a ```Translation file``` (which is basic javascript object) file from specifed location
and use component like ```<Localize localizer={localizer}>Hello</Localize>``` anywhere in your app.
You can also use only key based values if you wish like  ```{localizer.get("Hello")}``` 
for formmatted text you can use ```{localizer.getWithFormat("NewField", "$Brand")}``` here brand is another key in translation but you can also pass any value to replace variables in translation. 

##### Basic
```javascript
import React from 'react';

import sharedTranslations from "../Localizer/Translations/_Shared";
import navTranslations from "../Localizer/Translations/Navigation";
import {Localizer, Localize} from "../Localizer/Localizer";

//here we can instantiate many or single file according to component
var localizer = new Localizer([sharedTranslations, navTranslations]);

const Home = props => (

  <div>
         <h1>Usage 1,  use key of item to translate</h1>
         <p><Localize localizer={localizer}>Hello</Localize></p>
         <p><Localize localizer={localizer} dynamic="Home Page">NewField</Localize></p> 
         <p><Localize localizer={localizer} dynamic="$Name">NewField</Localize></p>

          <h1>Usage 2, use key with localizer instance and include variables by using getWithFormat </h1>
          <p> {localizer.get("Welcome")} <p>
          <p> {localizer.getWithFormat("NewField", "$Name")} <p>
          <p> {localizer.getWithFormat("NewField", "This value will replace variable inside translation")} <p> 

         <h1>Usage 3,  use translated version of text, it will replace given text with text in the current languange</h1>
         <p> <Localize localizer={localizer}>Such a nice weather we have today !</Localize></p>
         <p> {localizer.get("Such a nice weather we have today !")} <p>
  </div>

);

export default Home;

```



##### Translation Files
Use many files from any different locations. You need to instantiate your translations into localizer instance.
A translation file is basic key value javascript object.
```javascript

export default   
{
    Hello:
    {
        tr:"Merhaba",
        en:"Hello"
    },
    New:
    {
        tr:"Yeni",
        en:"New"
    },
    Welcome:{
        tr:"Hoşgeldiniz",
        en:"Welcome"
    },
    WeatherIsGood:{
        tr:"Bugün hava ne güzel !",
        en:"Such a nice weather we have today !"
    },
    Name:{
        tr:"Ad",
        en:"Name"
    },
    RequiredField:{
        tr:"[FieldName] Zorunlu Alan",
        en:"[FieldName] is Required field"
    },
}

```


##### Selected Lang
Library currently use a method to determine selected lang please method ```GetSelectedLang()``` in Localizer.js.
You can either change this method or pass selected when creating Localizer instance like below

```javascript

var YOUR_SELECTED_LANG = "EN";
var YOUR_DEFAULT_LANG = "TR";

import {Localizer, Localize} from "../Localizer/Localizer"; 
var localizer = new Localizer([sharedTranslations, navTranslations], langCode: YOUR_SELECTED_LANG, defaultLang: YOUR_DEFAULT_LANG);

```