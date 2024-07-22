// function doubleChar(str){
//     const characters = str.split('');
//     const doubleChar = characters.map(char => char + char);
//     // Write your code here
//     return doubleChar.join('');
//    }
//    const word = "Hello";
//    const Result = doubleChar(word);
//    console.log(doubleChar("String"))
//    // Output: 'SSttrriinngg'
//    console.log(doubleChar("Hello World"))
//    // Output: 'HHeelllloo WWoorrlldd'
//    console.log(doubleChar("1234!_ "))
//    // Output: '11223344!!__ '

function doubleChar(str){
    
    let doubleChar = '';

    for(let i=0;i<str.length;i++) {
        // console.log(i, str[i]);
        // console.log(str[i] + str[i])
        // doubleChar.push (words[i]+words[i]);
        doubleChar += str[i]+str[i];
    }
    return doubleChar;
    
   }
console.log(doubleChar("hello"));

//    console.log(doubleChar("String"))
//    console.log(doubleChar("Hello World"))
//    console.log(doubleChar("1234!_ "))
   
// doubleChar("dd");