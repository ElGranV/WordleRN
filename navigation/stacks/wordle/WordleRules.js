import { ScrollView, View, Text } from "react-native";



export default function WordleRules(props)
{
    return (
        <ScrollView>
            <Text>
                <Text>Règles du WORDLE</Text>
                <Text>Le but du jeu est de deviner un mot de 5 lettres.
                    Pour cela vous avez droit à 6 tentatives. A chaque tentative vous obtenez de nouveaux indices :
                    si une lettre du mot que vous venez de proposer se colore en gris clair, alors c'est qu'elle n'est pas
                    dans le mot à deviner. Si elle se colore en jaune, c'est qu'elle est dans le mot à deviner mais pas au bon endroit,
                    si enfin elle apparaît en vert, c'est qu'elle est bien placée dans le mot.
                </Text>

            </Text>
        </ScrollView>
    )
}