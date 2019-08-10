import React from 'react';


class InnerGameMechanics {
    private PlayerList: Playerlisttype;
    private Day: number;
    private ActionsTaken: Array<string>;

    constructor(PlayerList: Playerlisttype, Day: number) {
        this.PlayerList = PlayerList;
        this.Day = Day;
        this.ActionsTaken = [];
    }

    Exploration() {

    }

    AttackOrEncounter() {

    }

    Stealth() {

    }

    Forage() {

    }

    SanityCheck() {

    }

    Raid() {

    }

    Vore() {

    }

    DirectAttack() {

    }

    GenerateAlliences() {
        let ListOfIndexes: number[] = [...Array.from(Array(this.PlayerList.length - 1).keys())];
        ListOfIndexes = GenericUtilityFunctions.shuffleArray(ListOfIndexes);
        let Pairs = GenericUtilityFunctions.SplitArray(ListOfIndexes);
        Pairs.forEach(value => {
            if (value.length === 2) {
                let Player1 = this.PlayerList[value[0]];
                let Player2 = this.PlayerList[value[1]];

                this.FormedAlliance(Player1, Player2);
            }
        });

    }

    FormedAlliance(Player1: PlayerType, Player2: PlayerType) {
        this.ActionsTaken.push(Player1.Name + " Formed alliance with " + Player2.Name);
        Player1.Allies.push(Player2.Name);
        Player2.Allies.push(Player1.Name);
    }

    RunRound() {
        //initial Day Actions
        if (this.Day === -1) {
            this.GenerateAlliences()
        }
        const ListOfTwoNeededCanates = [this.AttackOrEncounter, this.Vore, this.Raid]
    }

}

class GenericUtilityFunctions {
    static shuffleArray(array: number[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    }

    static SplitArray(inputArray: number[]) {
        let perChunk = 2; // items per chunk

        let result = inputArray.reduce(ReduceFunct, []);

        function ReduceFunct(resultArray: number[][], item: number, index: number) {
            const chunkIndex = Math.floor(index / perChunk);

            if (!resultArray[chunkIndex]) {
                resultArray[chunkIndex] = [] // start a new chunk
            }

            resultArray[chunkIndex].push(item);

            return resultArray
        }

        return result;
    }
}

export default InnerGameMechanics;
