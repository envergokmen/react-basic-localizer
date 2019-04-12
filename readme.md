react simple localizer


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
import {Localizer, Localize} from "../Localizer/Localizer";

var localizer = new Localizer([sharedTranslations, navTranslations]);

const Home = props => (

  <div>
    <BreadCrumb navs={[{ link: ``, text: localizer.get("Management") }]}></BreadCrumb>
    <div id="MainListArea">
      <div>

         <h1>Usage 1,  use key or value directly</h1>
         <Localize localizer={localizer}>Hello</Localize>, There} !

          <h1>Usage 2,  use key with localizer instance and include variables by using getWithFormat </h1>
          <p> {localizer.getWithFormat("NewField", "$Name")} <p>
          
      </div>
    </div>
  </div>



);

export default Home;

```



##### Translation Files
Use many files from any different locations. You need to instantiate your translations into localizer instance
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