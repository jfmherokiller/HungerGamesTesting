type PlayerType = { Imageurl: string; Name: string; Health: number; MaxHealth: number; Fullness: number; KinkyNess: number; MaxFullness: number;
Aggressiveness: number; Allies: Array<PlayerType>;
Statuses: Array<string>; Tools: Array<string>; };
type Playerlisttype = Array<PlayerType>;