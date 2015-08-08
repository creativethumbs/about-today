
public var RemoteIP : String = "192.168.1.117"; 
public var SendToPort : int = 9000; //the port you will be sending from
public var ListenerPort : int = 8000; //the port you will be listening on
public var controller : Transform;
public var character = "girl"; //the tag of the object on stage that you want to manipulate
//public var situation = "";
//indices: 0 for date, 1 for interview, 2 for breakup, 3 for ex
public var situationIdx : int = 0;
private var handler : Osc;
//var familiar : Transform;
//private var fambubble = false;
private var neutralsmile : GameObject;
private var smileObject : GameObject; 
private var laughmouth : GameObject;
private var laughanim : Animator;
private var laugh2 : int = Animator.StringToHash("laugh"); 

private var friendliness : float; 
private var smile : float;
private var laugh = [false, false, false, false, false]; 
private var screaming : boolean; 
private var crying : boolean; 
private var compassion : float;
private var praise : float;
private var humor : float;
private var agreeability : float;
private var bragging : float;
private var sarcasm : float;
private var laughing : boolean;
public static var output : String;

public var screenFade : screenFade; 
private var gameEnd : boolean = false;  

public function Start() { 

	var persistentGameObject : GameObject = GameObject.Find("OldResults");
	var OldResultsScript = persistentGameObject.GetComponent(OldResultsScript);
	laughanim = GetComponent("Animator");
	
	smileObject = GameObject.Find("smile");
	laughmouth = GameObject.Find("laughPrefab");
	neutralsmile = GameObject.Find("neutralsmile"); 
	
	screaming = OldResultsScript.screaming;
	crying = OldResultsScript.crying;
	friendliness = OldResultsScript.friendliness; 
	smile = OldResultsScript.smile;  
	laugh = OldResultsScript.laugh;  
	compassion = OldResultsScript.compassion;
	praise = OldResultsScript.praise; 
	humor = OldResultsScript.humor; 
	agreeability = OldResultsScript.agreeability; 
	bragging = OldResultsScript.bragging; 
	sarcasm = OldResultsScript.sarcasm; 
	output = "";
	//Initializes on start up to listen for messages
	//make sure this game object has both UDPPackIO and OSC script attached

	var udp : UDPPacketIO = GetComponent("UDPPacketIO");
	udp.init(RemoteIP, SendToPort, ListenerPort);
	handler = GetComponent("Osc");
	handler.init(udp);
	handler.SetAllMessageHandler(AllMessageHandler);
	
	if(OldResultsScript.situation[situationIdx]) {
		var familiar = GameObject.Find("familiar");
		if(familiar != null)
			familiar.renderer.enabled = true;
	}
	
}
Debug.Log("Running");

function Update () {  
	var timerScript : Timer = GetComponent(Timer); 
	if(!gameEnd && timerScript.timeUp) { 
		gameEnd = true; 
		OldResultsScript.situation[situationIdx] = true;
		switch(situationIdx) {
			case 0:
				DateHandler(); 
				break;
			case 1:
				InterviewHandler(); 
				break;
			case 2:
				BreakupHandler(); 
				break;
			case 3:
				ExHandler(); 
				break;
			default:
				ReunionHandler();
				break;
		}
		screenFade.sceneEnding = true;
	}
	
	neutralsmile.renderer.enabled = (-0.5 <= smile && smile <= 0.5 ? true : false);
	  
	smileObject.transform.localScale.y = smile / 10f;
}

function ReunionHandler(){
	var desiredlaugh = [false, true, true, true, true]; 
	
	output = "I went to a high school reunion today. "; 
	
	if(friendliness < 0.125) {
		output += "I don't know why I felt so awkward with my old friends. You know the saying, 'distance makes the heart grow fonder'? Yeah no, that's a lie. "; 
	}
	else if(friendliness < 0.24) {
		output += "I kept to myself most of the time--there were just too many people... I wish I took the opportunity to catch up with the others. "; 
	}
	else if(friendliness < 0.35) {
		output += "I talked to the people I was closest to, but I wish I socialized with the others. Everyone seemed to have grown up a lot. "; 
	}
	else if(friendliness < 0.47) {
		output += "I caught up with several people, but I wish I had opened up more. "; 
	}
	else if(friendliness < 0.593) {
		output += "I caught up with quite a few people, but it seemed like even the friends I was closest to were not at ease with me--I guess time wears old feelings away. "; 
	}
	else if(friendliness < 0.8) {
		output += "I tried to be friendly to everyone but many of them seemed to think I was making a pass at them. I know this because in one awkward conversation a girl told me that she already had a boyfriend. "; 
	}
	else {	
		output += "Funny story actually--at some point, I got drunk on sparkling pear juice. The rest of the story is for you to imagine. ";
	}
	
	if(smile <= 0) {
		output += "In the second half of the party, people kept asking me what was wrong--I'm not really sure why but maybe I looked too serious. "; 
	}
	else if(smile < 4) {
		output += "Anyway, everyone looked so happy. I tried to match their expressions but after seeing HIM I couldn't really keep it up. "; 
	}
	else if(smile < 7) {
		output += "Anyway, I don't believe I've smiled that much in a long time. I think it even creeped some people out. "; 
	}
	else {
		output += "Anyway, I don't believe I've smiled that much in a long time. It creeped a lot of people out. "; 
	}
	
	if(humor < 0.2) {	
		output += "Also, I didn't make that many jokes and mostly listened to other people's. If only I could be the life of the party... "; 
	}
	else if(humor < 0.56) {
		output += "I also made a lot of puns but I think the majority of the people weren't able to relate to my humor. "; 
	}
	else if(humor > 0.747) {
		output += "Also, I cracked so many lame jokes that I felt bad for not giving other people the chance to tell better ones. "; 
	}
	
	if(laugh[0] != desiredlaugh[0] || laugh[1] != desiredlaugh[1] ||
		laugh[2] != desiredlaugh[2] || laugh[3] != desiredlaugh[3] ||
		laugh[4] != desiredlaugh[4]) {
		output += "Speaking of jokes, my laugh is as awkward as ever. ";
		
	}
	
	if (bragging < 0.2) {
		output += "I was pretty humble most of the time, but so many people were boasting about the cool things they did in college. Maybe I should have done so too. "; 
	}
	else if (bragging < 0.4) {
		output += "I was relatively humble most of the time, but so many people were boasting about the cool things they did in college. Now I wish I had bragged a little more. "; 
	}
	else if(0.5 < bragging && bragging < 0.7) {
		output += "I talked a lot about how cool my college was and people were glaring daggers at me. Maybe that was a bad idea... "; 
	}
	else if(bragging >= 0.7) {
		output += "Hah, and I think my university brainwashed me--I probably praised my college so much that I sounded like an advertisement. "; 
	}
	
	if(sarcasm > 0.4) {
		output += "I really need to keep my sarcastic remarks under control too...I think I offended a lot of people. What if they don't invite me to the next reunion? That would be sad. "; 
	}
	
	if(!screaming && crying) {
			output += "Anyway, it got pretty emotional at the end and a lot of people cried. Myself included. ";
	}
	else if(screaming && !crying) {
		output += "Anyway, it got pretty crazy at the end--we were so noisy that the restaurant staff had to kick us out, haha. "; 
	}
	else if(screaming && crying) {
		output += "Anyway, it got pretty crazy at the end--for me, at least. I was still kinda drunk from the pear juice and got super emotional. That was embarrassing... "; 
	}
	
	output += "\n\nAs awkward as everything was most of the time, I wish I could see everyone again... ";
}

function ExHandler(){
	output = "I uh, saw HIM today. ";
	
	if(friendliness < 0.125){
		output += "I'm still kind of upset at him, and I'm sure that showed at a few points. I really shouldn't let old feelings get to me. "; 
	}
	else if(friendliness < 0.24) {
		output += "I felt kind of awkward around him because of, well, the whole breakup thing--but I really shouldn't let old feelings get to me. "; 
	}
	else if(friendliness < 0.367) {
		output += "I tried to be a little friendly, but it was hard for me to open up to him the same way I used to. "; 
	}
	else if(friendliness < 0.451){
		output += "If only I had opened up to him a bit more...maybe we would have stayed good friends. "; 
	}
	else if(friendliness < 0.613) {
		output += "Initially, everything felt weirdly...normal? It was as if nothing happened. Don't you find that weird? Maybe I'm overthinking things... "; 
	}
	else if(friendliness < 0.72) {
		output += "Hah. I admit that I flirted with him a little, out of habit. He didn't seem too happy with that. "; 
	}
	else if(friendliness < 0.91){
		output += "Hah. I was probably way too flirtatious with him. I mean, I was just teasing, but he didn't seem to take it too well. "; 
	}
	else {
		output += "So this is how the conversation went at the beginning:\nHim: Hey, how's it going? It's been a while.\nMe: HEEYY BROOO LONG TIME NO SEEEE~!\nShould not have had that Redbull before seeing him... "; 
	}
	
	if(smile <= -0.3) {
		output += "Because I was still sore at our failed relationship, I really couldn't bring myself to appear happy around him. "; 
	}
	else if(-0.3 < smile && smile < 0.3) {	
		output += "Most of the time I was just very neutral around him. Should have tried to be more cheerful. "; 
	}
	else if(smile < 6) {
		output += "I also made an attempt to be cheerful? He didn't seem to detect anything but now I feel like I should have been more honest with myself. ";
	}
	else {
		output += "Also I tried so hard to appear happy and not upset at him that even HE, THE INSENSITIVE JERK was able to detect how forced my smiles were. "; 
	}
	
	if(humor < 0.2){
		output += "I cracked a lame joke here and there, but it was hard to stay in good spirits around him. "; 
	}
	else if(humor > 0.555) {
		output += "Hah. And I made so many puns. That annoyed him a little. "; 
	}
	
	if(!laugh[0]&& !laugh[1]&& !laugh[2] && !laugh[3] && !laugh[4]) {
		output += "It didn't help that I didn't laugh at any of his jokes. That wasn't my fault though--they all sucked. ";
			
	}
	
	if(compassion < 0.2) {
		output += "Later he was telling me how his dog died recently, and I was just like, 'Again??'. Hmm, maybe that was a little too harsh. "; 
	}
	else if(compassion < 0.4) {
		output += "Later he was telling me how his grandmother died a couple of months back, and I tried to reassure him but it felt really mechanical. "; 
	}
	else if(compassion > 0.8) {
		output += "Later he was telling me how he lost his job a few weeks ago. I wasn't sure what to say, so I put my hand on his to reassure him. He immediately pulled away. "; 
	} 
	
	if(agreeability < 0.2) {
		output += "Eventually our conversation dwindled into a silly argument. Heh, we didn't seem to have grown up at all. "; 
	}
	else if(agreeability > 0.7) {
		output += "I also just agreed with pretty much everything he said. Maybe I shouldn't have tried so hard to please him. "; 
	}
	
	if(bragging > 0.5) {
		output += "I then proceeded to talk about my accomplishments, but he didn't seem to want to listen to me. "; 
	}
	
	if(sarcasm > 0.4) {
		output += "Also, I couldn't really hold back my sharp tongue. He took it really personally. "; 
	}
	
	if(!screaming && crying) {
			output += "Other things happened too, but long story short: I cried, he stormed out, we won't be seeing each other again. ";
	}
	else if(screaming && !crying) {
		output += "Other things happened too, but long story short: I yelled, he yelled, we were both politely escorted out of the cafe. Oh, and we won't be seeing each other again. "; 
	}
	else if(screaming && crying) {
		output += "Other things happened too, but long story short: I yelled, he yelled, I cried, the waiter came to give us our check, and I walked out. We probably won't be seeing each other again. "; 
	}
	
	output += "\n\nBut when it comes down to it, exes suck. I hope I won't have to deal with too many of those... ";
	
}

function BreakupHandler(){
	output = "...We broke up today. ";
	var desiredfriendliness = 0.404;
	var desiredsmile =  5.5; 
	var desiredlaugh = [false, false, false, false, false]; 
	
	if(friendliness < 0.125) {
		output += "\n\n...\n\nI made him cry. I don't want to talk about it.";
	}
	else {
		if(friendliness < 0.171) {
			output += "I said some things I really regret. Maybe I was too hard on him. ";
		}
		else if(friendliness < 0.23) {
			output += "It didn't go that terribly--we just didn't say much to each other. ";
		}
		else if(friendliness < 0.324) {
			output += "I tried to act normal, but...never mind. "; 
		}
		else if(friendliness < desiredfriendliness) {
			output += "I wanted to believe that we'd have a chance at being friends... ";
		} 
		else if(friendliness < 0.546) {
			output += "I should have been more firm--he didn't seem to believe me at first. "; 
		}
		else if(friendliness < 0.76) {
			output += "He didn't take me seriously at all! Not until I said goodbye. "; 
		}
		else {
			output += "I was just so conflicted emotionally...after we parted I wasn't even sure if I said what I needed to. ";
		}
	
	
		if(smile < -6)
		{
			output += "I really wish things did not have to turn out like this--letting him go was a lot harder than I thought it would be. "; 
		}
		else if(smile < -2) {
			output += "I almost couldn't go through with it, you know? "; 
		}
		else if(smile < 0.3) {
			output += "It was hard for me--even though I knew it was the right thing to do. ";
		}
		else if(-0.3 <= smile && smile <= 0.3) {
			output += "Deep inside though, I think I knew that I didn't feel the same towards him anymore. "; 
		}
		else if(smile < 4){
			output += "I tried to tell him in the most civil way possible. He still didn't take it very well. "; 
		}
		else if(smile < 7){
			output += "I wanted to leave on good terms--to make it easier for him. But maybe my behavior just ended up hurting him more. "; 
		}
		else {
			output += "He seemed kind of annoyed. Maybe it was because I tried too hard to appear happy. ";
		}
		
		if(humor > 0.185) {
			output += "Also I tried to lighten the mood, but he was offended that I couldn't take things seriously. "; 
		}
		
		if(laugh[0] != desiredlaugh[0] || laugh[1] != desiredlaugh[1] ||
			laugh[2] != desiredlaugh[2] || laugh[3] != desiredlaugh[3] ||
			laugh[4] != desiredlaugh[4]) {
			output += "Ugh, I really shouldn't have laughed at him...that just made things worse. ";
			
		}
		
		if(compassion < 0.2) {
			output += "Then again, he had it coming to him. ";
		}
		else if(compassion < 0.4) {
			output += "I almost felt sorry for him, though. Almost. ";
		}
		else if(compassion < 0.6) {
			output += "At some point, he looked like he was about to tear up. I had to fight the urge to give him a hug and take my words back. ";
		}
		else if(compassion < 0.8) {
			output += "At some point, he looked like he was about to tear up. I didn't know what to say, so I just held him close. That just made it harder for both of us. ";
		}
		else {
			output += "At some point, he looked like he was about to tear up. And I couldn't do or say anything to comfort him, because I had my own tears to hold back. ";
		} 
		
		if(!screaming && crying) {
			output += "I did cry at the end. What a pathetic ending to a pathetic relationship. Hah. ";
		}
		else if(screaming && !crying) {
			output += "Anyway, we ended up just yelling at each other. I guess it was best that we didn't try to stay together. "; 
		}
		else if(screaming && crying) {
			output += "Anyway, I ended up yelling at him and storming out in tears. I could feel everyone's eyes on my back, but I never needed their sympathy. "; 
		}
		
	}
	output += "\n\nI really wish I won't need to go through this kind of thing again... ";
	
}

function InterviewHandler() {
	output = "I had a job interview today. It didn't go so well...";
	var desiredfriendliness = 0.442;
	var desiredsmile =  5.5; 
	var desiredlaugh = [false, true, true, true, false]; 
	var desiredhumor = 0.231; 
	var desiredagree = 0.6;  
	var desiredbragging = 0.4;
	var desiredsarcasm = 0.04;  
	
	if(friendliness != desiredfriendliness) {
		if(friendliness < 0.14) {
			output += "I was kinda put off by the interviewer, so I didn't try too hard to be nice to him. "; 
		} 
		else if(friendliness < 0.229) {
			output += "I was really nervous--should have opened up more. "; 
		} 
		else if(friendliness < 0.31) {
			output += "I was quite nervous--should have opened up just a bit more. "; 
		} 
		else if(friendliness < desiredfriendliness) {
			output += "If only I had opened up a bit more. "; 
		} 
		else if(friendliness < 0.5) {
			output += "I think I might have been too friendly. The interviewer seemed kinda awkward. "; 
		} 
		else if(friendliness < 0.654) {
			output += "I thought that maybe if I charmed the interviewer a little, he would give me the job. Didn't work... "; 
		} 
		else if(friendliness < 0.767) {
			output += "The interviewer I had was REALLY HOT so I couldn't help but act a little, er, forward. "; 
		} 
		else if(friendliness < 0.881) {
			output += "Let me just say that pre-interview caffeine was not such a good idea... "; 
		} 
		else {
			output += "I practically just yelled at him to give me the job. Didn't work. ";
		}
	}
	
	if(smile < -6) {
		output += "I also thought that if I appeared miserable, he would feel sorry for me? "; 
	} 
	else if(smile < -3) {
		output += "Also I was feeling pretty stressed out, so that probably showed. "; 
	} 
	else if(smile < -0.3) {
		output += "I had a rough day before the interview--I couldn't really hide it. "; 
	} 
	else if(smile < 0.3) {
		output += "I wanted to appear serious and 'professional', so I pretty much just deadpanned my way through. "; 
	} 
	else if (smile < 4) {
		output += "Should've at least smiled a little more. ";
	}
	else if (smile < desiredsmile) {
		output += "Maybe a couple more smiles here or there would have helped. ";
	}
	else if (smile < 7) {
		output += "I tried to smile a lot as well, which made my face feel numb. ";
	} 
	else if (smile != desiredsmile) { 
		output += "I made an attempt to smile a lot, but he looked pretty creeped out. "; 
	}
	
	if(humor < 0.03) {
		output += "Maybe I was also too uptight at several points. I don't know. ";
	}
	else if(humor < 0.15) {
		output += "Maybe I was also too serious. I don't know. ";
	}
	else if(humor < desiredhumor) {
		output += "Maybe I should have made more jokes. Everyone loves jokes. ";
	} 
	else if(humor < 0.5) {
		output += "I think I managed to lighten up the atmosphere, at least. ";
	}
	else if(humor != desiredhumor) {
		output += "Also, the guy just didn't take me seriously. ";
	}
	
	if(agreeability < 0.3) {
		output += "I didn't really believe in the company's mission, so I just disagreed with most of what he said. "; 
	}
	else if(agreeability < 0.5) {
		output += "You know, the corporate world is just a bunch of bullshit--it's all about going with whatever people say. That's not for me. ";
	} 
	else if (agreeability < desiredagree) {
		output += "Maybe I also should have followed the corporate bullshit and just nodded along with whatever the guy said. ";
	}
	else if(agreeability > desiredagree) {
		output += "Hah. I also made no attempt to hide the obviousness of my brown-nosing. That didn't help. "; 
	} 
	
	if(bragging < 0.2) {
		output += "I might have been too humble as well. ";
	}
	else if(bragging < desiredbragging) {
		output += "Argh, and I should have appeared more confident. ";
	}
	else if(bragging < 0.7) {
		output += "Should have toned down my ego a bit as well. ";
	}
	else if(bragging != desiredbragging) {
		output += "And I think the guy hated my guts for being too cocky. IT'S NOT MY FAULT THAT I'M BETTER THAN HIM. ";
	}
	
	if(sarcasm > desiredsarcasm) {
		output += "Also I totally wasn't sarcastic at all. Totally. ";
	}
	
	if(!screaming && crying) {
		output += "Anyway, at the end the interviewer just outright rejected me and I burst into tears. Yup, sad story. ";
	}
	else if(screaming && !crying) {
		output += "Anyway, when the interviewer outright rejected me at the end, something in me...snapped. I don't remember exactly what I said but it made him run out of the room. "; 
	}
	else if(screaming && crying) {
		output += "Anyway, in the end he gave me the whole, 'We appreciate your interest, but we are unable to accomodate a candidate of your caliber in our company', spiel. I promptly had a mental breakdown. "; 
	}
	
	output += "\n\nWhat I wouldn't give to have just one more chance...";
}

function DateHandler() {
	output = "A friend set me up on a blind date. It didn't go quite as I planned...";
	var desiredfriendliness = 0.694;
	var desiredsmile =  4; 
	var desiredlaugh = [false, true, true, true, false]; 
	var desiredhumor = 0.56; 
	var desiredagree = 0.5; 
	var desiredcompass = 0.6; 
	var desiredbragging = 0.18;
	var desiredsarcasm = 0.1; 
	var desiredpraise = 0.4; 
	
	if(friendliness == desiredfriendliness) {	
		//do nothing
	}
	else if(friendliness < 0.1) {
		output += "I felt so mean! I don't know why I said so many horrible things. "; 
	} 
	else if(friendliness < 0.3) {
		output += "I kept to myself most of the time--didn't really feel comfortable around the guy. "; 
	}
	else if(friendliness < 0.391) {
		output += "I didn't really say much to him...If I had opened up more, maybe things would have gone well. "; 
	}
	else if(friendliness < 0.493) {
		output += "I felt kind of awkward around the guy, so I could only make a half-assed effort to be friendly. "; 
	}
	else if(friendliness < 0.55) {
		output += "I might have been too cordial--didn't really make any moves. "; 
	}
	else if(friendliness < 0.6) {
		output += "I tried to keep a balance of 'friendly' and 'flirty', but maybe I should have been more flirty? "; 
	}
	else if(friendliness < 0.682) {
		output += "Ugh, if only I had flirted just a LITTLE more..."; 
	}
	else if(friendliness < 0.712) {
		output += "Ugh, if only I had flirted just a LITTLE less..."; 
	}
	else if(friendliness < 0.793) {
		output += "I might have been a little bit too forward. "; 
	}
	else if(friendliness < 0.864) {
		output += "The guy looked kind of uncomfortable. Maybe I was a little too forward? "; 
	}
	else if(friendliness < 0.926) {
		output += "the guy looked pretty uncomfortable. Maybe I was too forward. "; 
	}
	else {
		output += "I was so taken by the guy that I practically jumped on him. Maybe that was a bad idea? "; 
	}
	
	if(smile == desiredsmile) {
		//
	} 
	else if(smile < -6) {
		output += "Also I was feeling pretty stressed out, so that probably showed. "; 
	} 
	else if(smile < 0) {
		output += "Also I wasn't having such a great day before the meeting, so that probably showed. "; 
	} 
	else if (smile < desiredsmile) {
		output += "Should've smiled more, too. ";
	}
	else if (smile < 5) {
		output += "At least I tried to smile a lot--well, maybe a little too much. ";
	}
	else if (smile < 7) {
		output += "I tried to smile a lot as well, but my face really hurt afterwards. ";
	} 
	else { 
		output += "I also tried to smile a lot, but he looked pretty creeped out. "; 
	}
	
	if(humor == desiredhumor) {
	}
	else if(humor < 0.21) {
		output += "It didn't really help that the guy wasn't that funny, so it was also hard for me to come up with jokes. ";
	}
	else if(humor < 0.456) {
		output += "I made some jokes, I don't really know if he found them funny. ";
	}
	else if(humor < desiredhumor) {
		output += "I made several jokes, too--but it was easy to see that most of his laughs were fake. ";
	}
	else if(humor < 0.75) {
		output += "I think I tried way too hard to be funny...the guy would change the subject each time I made a joke. ";
	}
	else {
		output += "And I probably made too many puns. Way too many puns...I guess you can say my rejection was my PUNishment! HA HA--okay not funny. ";
	}
	
	if(laugh[0] != desiredlaugh[0] || laugh[1] != desiredlaugh[1] ||
		laugh[2] != desiredlaugh[2] || laugh[3] != desiredlaugh[3] ||
		laugh[4] != desiredlaugh[4]) {
		output += "Speaking of jokes, my laugh is so awkward, it's embarrassing...";
		
	}
	
	if(bragging > desiredbragging) {
		output += "And I shouldn't have talked so much about myself--no one likes a self-absorbed jerk. ";
	}
	
	if(compassion < 0.2) {
		output += "Somewhere in the conversation he was telling me about how his dog died last week, and I wasn't sure how to respond to it so I kind of just nodded and didn't say anything. "; 
	}
	else if(compassion < 0.3) {
		output += "Somewhere in the conversation he was telling me about how his dog died last week, so I tried reassuring him but I think that made it even worse. "; 
	}
	else if(compassion < 0.4) {
		output += "Somewhere in the conversation he was telling me about how his dog died last week, so I tried reassuring him but it didn't seem to do anything. ";
	}
	else if(compassion < 0.45) {
		output += "Somewhere in the conversation he was telling me about how his dog died last week, so I tried to reassure him. It didn't seem to have much of an effect. "; 
	}
	else if(compassion < 0.57) {
		output += "Somewhere in the conversation he was telling me about how his dog died last week, so I tried to reassure him. It seemed to make him feel just a little better. "; 
	}
	else if(compassion <= 0.6) {
		output += "\n\nI don't see myself as someone who's particularly good at consoling people. Heck, I can hardly give myself advice. But somewhere in the conversation, when he was telling me how his dog died sometime last week, I tried my best to comfort him. And from the way he looked at me after that, I had a crazy thought that maybe--just maybe--I was actually able to say something right. \n\n"; 
	}
	else {
		output += "Somewhere in the conversation he was telling me about how his dog died last week, so I tried to reassure him. Maybe I tried a little too hard. "; 
	}
	
	if(agreeability < 0.2) {
		output += "Anyway...we seemed to have conflicting opinions on a lot of things. Maybe we're just not compatible with each other. "; 
	}
	else if(agreeability < 0.3) {
		output += "Anyway...we seemed to disagree on most things. Maybe it's not meant to be. ";
	}
	else if(agreeability < 0.4) {
		output += "Anyway...we seemed to have some different views. I don't think it can work out. ";
	}
	else if (agreeability < desiredagree) {
		output += "Anyway...we seemed to disagree on a few things. I guess people can't agree on everything. ";
	}
	else if(agreeability > desiredagree) {
		output += "Anyway...we seemed to agree on most things, but now I feel like I wasn't being true to myself. "; 
	} 
	
	if(sarcasm > desiredsarcasm) {
		output += "And it didn't help that I made several pretty sarcastic comments.";
	}
	
	if(!screaming && crying) {
		output += "Also, crying at the end was probably a bad idea. Damn periods. ";
	}
	else if(screaming && !crying) {
		output += "Oh, and screaming at the end was a pretty bad idea. Don't ask me how that happened. "; 
	}
	else if(screaming && crying) {
		output += "Also, screaming and crying at the end was definitely a bad idea. "; 
	}
	
	
	output += "\n\nWhat I wouldn't give to have just one more chance...";
}

public function AllMessageHandler(oscMessage: OscMessage){

	var msgString = Osc.OscMessageToString(oscMessage); //the message and value combined
	var msgAddress = oscMessage.Address; //the message parameters
	var msgValue = oscMessage.Values[0]; //the message value
	Debug.Log(msgString); //log the message and values coming from OSC

	//FUNCTIONS YOU WANT CALLED WHEN A SPECIFIC MESSAGE IS RECEIVED
	switch (msgAddress){
		case "/1/laughtoggle":
			if(!laughing && msgValue == 1) {
				laughing = true;
			}
			break;
		case "/1/friendlyFader": 
			OldResultsScript.friendliness = msgValue;
			friendliness = msgValue;
			break;
		case "/1/smileRotary": 
			OldResultsScript.smile = msgValue;
			smile = msgValue;
			break;
		case "/1/behaviorFader/1":
			OldResultsScript.sarcasm = msgValue; 
			sarcasm = msgValue;
			break;
		case "/1/behaviorFader/2": 
			OldResultsScript.bragging = msgValue;
			bragging = msgValue;
			break;
		case "/1/behaviorFader/3": 
			OldResultsScript.agreeability = msgValue;
			agreeability = msgValue;
			break;
		case "/1/behaviorFader/4": 
			OldResultsScript.humor = msgValue;
			humor = msgValue;
			break; 
		case "/1/behaviorFader/5": 
			OldResultsScript.compassion = msgValue;
			compassion = msgValue;
			break;
		case "/1/screamtoggle": 
			OldResultsScript.screaming = (msgValue == 1 ? true : false); 
			screaming = (msgValue == 1 ? true : false); 
			break;
		case "/1/crytoggle": 
			OldResultsScript.crying = (msgValue == 1 ? true : false);
			crying = (msgValue == 1 ? true : false);
			break;
		case "/1/laugh/1/1": 
			laugh[0] = (msgValue == 1 ? true : false);
			OldResultsScript.laugh[0] = laugh[0];
			break;
		case "/1/laugh/1/2": 
			laugh[1] = (msgValue == 1 ? true : false);
			OldResultsScript.laugh[1] = laugh[1];
			break;
		case "/1/laugh/1/3": 
			laugh[2] = (msgValue == 1 ? true : false);
			OldResultsScript.laugh[2] = laugh[2];
			break;
		case "/1/laugh/1/4": 
			laugh[3] = (msgValue == 1 ? true : false);
			OldResultsScript.laugh[3] = laugh[3];
			break;
		default:
			break;
	}

} 

//FUNCTIONS CALLED BY MATCHING A SPECIFIC MESSAGE IN THE ALLMESSAGEHANDLER FUNCTION
public function Rotate(msgValue) : void //rotate the cube around its axis
{
	yRot = msgValue;
}

public function Example(m : OscMessage) : void
{
    Debug.Log("--------------> OSC example message received: ("+m+")");
    var oscM : OscMessage = Osc.StringToOscMessage ("/1/screamtoggle 1");
	handler.Send (oscM);
}
