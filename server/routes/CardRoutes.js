import fs from 'fs';
import Card from '../models/Card';

module.exports = {
    //Should never use client side with current setup.
    readCards : function(req, res) {
        let cards = getCardData();
        res.json(cards);
    }
}

function getCardData() {
    let rawData = fs.readFileSync('../data/cards.json');
    let valveCardData = JSON.parse(rawData);
    let valveCards = valveCardData.card_set.card_list;

    //Dynamically modify the card data to just include relevant info for the client.
    let cleanCards = [];
    for(let vc of valveCards) {
        let type = "";
        type = vc.card_type;

        if(type === "Ability" || type === "Passive Ability") {
            //Skip if the card is a built in Ability.
        }
        else {
            let newCard = new Card();

            let color = "";
            if(vc.is_red) {
                color = "red";
            }
            else if(vc.is_blue) {
                color = "blue";
            }
            else if(vc.is_green) {
                color = "green";
            }
            else if(vc.is_black) {
                color = "black";
            }

            newCard.card_id = vc.card_id.toString();
            newCard.card_name = vc.card_name.english.toString();
            newCard.card_type = vc.card_type.toString();
            newCard.image = vc.large_image.default.toString();
            newCard.card_color = color.toString();
            newCard.owned = "false";

            newCard.save()
                .then(card => {
                    console.log('Update!')
                })
                .catch(err => {
                    console.log(err);
                });

            cleanCards.push(newCard);
        }
    }
    return cleanCards;
}