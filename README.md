## Anime Quiz
#### Generate random anime quiz!

### Installation
```js
npm i aniquiz
```

### Usage
#### Generate random anime quiz
```js
const animequiz = require('aniquiz')

// Random quiz object
console.log(animequiz.getEntry())

// Quiz object with difficulty
console.log(animequiz.getEntry({ difficulty: 'easy' }))

// Quiz object with image
console.log(animequiz.getEntry({ image: true })

// Quiz object without image
console.log(animequiz.getEntry({ image: false }))
```

### Options
| property | type | default |
| --- | --- | --- |
| difficulty | string | none |
| image | boolean | none |

### Quiz object
| Property | type | description |
| --- | --- | --- |
| difficulty | string | The difficulty of the question
| time | number | The time in ms the question should be answered
| question | string | The question
| answers | array | The array of possible answers
| image | string | The image of the question, if applicable
| submittedBy | string | The one created the question
| id | string | The id of this question
| custom | boolean | Whether this quiz object was manually added

### Example response
Success
```js
{
  difficulty: 'Hard',
  time: 20000,
  question: 'The name of Junko Enoshima’s imposter at the beginning of Danganronpa: Trigger Happy Havoc is?',
  answers: [ 'mukuro ikusaba', 'ikusaba mukuro' ],
  image: null,
  submittedBy: 'Sakurajimai',
  id: '111'
}
```
Error
```js
{ error: 'error msg.' }
```

### Create instance
Creating a quiz instance allows you to prevent receiving the same question twice
```js
const { Quiz } = require('aniquiz');

// class parameters accepts options
const quiz = new Quiz({ difficulty: 'easy' })

// Quiz object
console.log(quiz.getEntry())

// Quiz entries
console.log(quiz.getEntries())

// Accepts options parameter as well
```

### Error
If instance runs out of quiz entry, you encounter the following error
```js
{ error: 'Exhausted entries.' }
```
You can reload entries by using 
```js
quiz.reload(options)
```
or add your own entries via 
```js
quiz.addEntries([])
```
Added entries will be appended with custom property which is set to true.

### Total Entries: 132
