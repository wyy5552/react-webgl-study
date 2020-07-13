import { myObj,myName, myAge, myfn, myClass } from "./test1.js";


function test(){
    console.log(myfn());// My name is Tom! I'm 20 years old.
    console.log(myAge);// 20
    console.log(myName);// Tom
    console.log(myClass.a );// yeah!
    console.log(myObj);
    myObj.name = "myObj change name test2";
    console.log(myObj);
    myClass.a = "hello,i change";
}

export {test};