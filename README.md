<br />
<br />

<p>
<img src="https://nearprotocol.com/wp-content/themes/near-19/assets/img/logo.svg?t=1553011311" width="240">

<img src="https://camo.githubusercontent.com/46b35cfde3037086d2777436e46fc1a0f1f035ec/68747470733a2f2f697066732e696f2f697066732f516d65364b4a644b637038355459624c78754c56376f517a4d694c72656d4437484d6f584c5a456d676f36526e682f6a732d697066732d737469636b65722e706e67" width="244">
</p>

<br />
<br />

<p>Application Page: https://bryanapinos.github.io/schoolchain-news/</p>
[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/BryanAPinos/schoolchain-news)


## SchoolChain News

This was built off of the Near Protocol [create-near-app](https://github.com/nearprotocol/create-near-app), along with [js-ipfs](https://github.com/ipfs/js-ipfs).

##### Challenge Description

"The focus here is to build something that amplifies the voices of students without the administrators and school being able to censor student voices."

### Solution: SchoolChain News

SchoolChain News is a decentralized website where a student can safely make a post about their college or university without the fear of censorship, all while being anonymous.

### Thought Process

While anyone would be able to look at the posts written and the list of schools, only editors can make posts. Editors are only students who have have a Near account and login to their wallet, as well as having sufficient funds.

To avoid censorship of any kind, the posts will be converted into a cryptographic hash, a bunch of numbers and letters, and saved through IPFS which would circulate on every participating computer. Meaning, that if one laptop was holding onto that data, and that laptop turns off, then the next participating laptop would run that data automatically. This way that data cannot be changed, and cannot be stopped. There would be no way any censorship can happen to that data.

This would allow students to have their voice heard without fear of censorship from administrators.

### Problems that need to be solved

Currently for Editors, the code doesn't look for a specific token in their wallet, so that needs to be fixed towards a specific membership token.

There is the issue of determining who is a student and how to safely send them a membership token without it being person to person.

Another issue would be if a student attempts to give their membership token to a non student, and if they student graduates they would still have the token.

It can't check the balance automatically after a user login, therefore that needs to be updated through the button click.

### Possible solutions and future updates

Special membership tokens where once a wallet has that token, then they have access to make posts.

To move the whole website and have it all hosted on IPFS for complete decentralization.

User friendly.

Note: This is my first time working with Near Protocol and IPFS
