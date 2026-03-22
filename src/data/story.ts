export interface StoryContent {
	title: string
	content: string
}

export interface StoryPage {
	id: number
	en: StoryContent
	mi: StoryContent
	image: string
}

export const storyData: StoryPage[] = [
	{
		id: 1,
		en: {
			title: 'The Valley of Ōtara',
			content:
				'In the quiet valley of Ōtara, where mist curls like soft korowai around the hills, there lived a taniwha named Te Tahi-o-Te-Rā. His home was a hidden cave beneath the shimmering waters, a place known to the people as Te Ana-o-Te Tahi. The children of the valley loved to swim near the cave—but only when the water was clear. For everyone knew: when the water glowed gold like koura, Te Tahi had returned, and it was time to leave the river in peace.',
		},
		mi: {
			title: 'Te Whārua o Ōtara',
			content:
				'Kei te whārua mātao o Ōtara, e kōpere ana te kohu ki ngā puke, e noho ana tētahi taniwha, ko Te Tahi-o-Te-Rā tōna ingoa. Ko tana kāinga he ana huna kei raro tonu i te wai, e kīia ana ko Te Ana-o-Te Tahi. He maha ngā tamariki i kaukau i taua wāhi—engari mēnā he mā te wai anake. I mōhiotia whānuitia: ki te huri koura te wai, kua hoki mai a Te Tahi, ā, me waiho rā te awa kia tau.',
		},
		image: 'https://picsum.photos/seed/valley/800/600',
	},
	{
		id: 2,
		en: {
			title: 'Feeding the Guardian',
			content:
				'The kuia of Ngāti Ngahere would walk to the water’s edge carrying small baskets of kai. They would toss the food gently into the cave’s mouth. “Noho ora, e Te Tahi,” they whispered. Be well, Te Tahi. Some said it was a gift. Some said it was a sign of respect. And some said it was simply the way things had always been.',
		},
		mi: {
			title: 'Te Whāngai i te Kaitiaki',
			content:
				'Ka haere ngā kuia o Ngāti Ngahere ki te taha o te wai. He kete kai kei ō rātou ringaringa. Ka whiua e rātou ngā kai ki roto ki te ana, me te kōrero māhaki: “Haere tonu tō ora, e Te Tahi.” He mea tuku aroha pea. He tohu whakanuia pea. He tikanga tuku iho e kore nei e memeha.',
		},
		image: 'https://picsum.photos/seed/feeding/800/600',
	},
	{
		id: 3,
		en: {
			title: 'Te Tahi’s Lineage',
			content:
				'Te Tahi-o-Te-Rā was no ordinary being. He was a mokopuna of Toroa, the great rangatira of the Mātaatua waka, and the son of Ruaihona. He grew to become a tohunga of immense power—a healer, a protector, and sometimes… someone to fear.',
		},
		mi: {
			title: 'Te Whakapapa o Te Tahi',
			content:
				'Ehara a Te Tahi-o-Te-Rā i te mea noa iho. He mokopuna ia nā Toroa, te rangatira o te waka Mātaatua, ā, he tama nā Ruaihona. I tipu ake hei tohunga whai mana, he kaiārahi, he kaiwhakaora, ā i ētahi wā… he tangata i matatakina.',
		},
		image: 'https://picsum.photos/seed/lineage/800/600',
	},
	{
		id: 4,
		en: {
			title: 'The Sacred Rock',
			content:
				'Near his home stood a tall and jagged rock, rising high above the water like a guardian watching over the valley. This was Te Toka-a-Houmea. Harakeke grew from its sides, made sacred by Te Tahi’s rituals. It was here he performed karakia, here he offered prayers to ancient atua, here he held the weight of his mana.',
		},
		mi: {
			title: 'Te Toka Tapu',
			content:
				'Kei tōna kāinga tētahi toka nunui, e tū whakarakei ana ki runga ake i te wai. Ko Te Toka-a-Houmea tōna ingoa. I tipu ake te harakeke i runga i taua toka, he tapu te harakeke nei, i te mea he wāhanga nui ki ngā tikanga o Te Tahi. I reira ia ka tū karakia, ka tuku whakahere ki ngā atua o nehe, ā, ka pupuri i tōna mana.',
		},
		image: 'https://picsum.photos/seed/rock/800/600',
	},
	{
		id: 5,
		en: {
			title: 'Fear Among His People',
			content:
				'But as Te Tahi grew older, his mana grew even stronger. And sometimes, when people do not understand great power, fear begins to grow too. Quiet meetings were held. Whispers travelled in the night. Until the people reached a hard decision… They must leave Te Tahi behind.',
		},
		mi: {
			title: 'Ka Tipu te Mataku',
			content:
				'I te pakeketanga o Te Tahi, ka kaha ake hoki tōna mana. Ā, mēnā ka kore te iwi e mārama ki te mana nui o tētahi, ka tipu te mataku. Ka hui huna te iwi. Ka tere ngā kōrero i te pō. Ā, ka tau te whakatau taumaha… Me waiho a Te Tahi ki muri.',
		},
		image: 'https://picsum.photos/seed/fear/800/600',
	},
	{
		id: 6,
		en: {
			title: 'The Journey to Whakaari',
			content:
				'One summer day, the iwi prepared to travel to Whakaari, the island of steaming cliffs and nesting tītī. They loaded their waka with kai and precious water, and then they invited Te Tahi to join them—to lead the karakia for a plentiful harvest. Trusting them, he accepted.',
		},
		mi: {
			title: 'Te Haerenga ki Whakaari',
			content:
				'I tētahi raumati, ka whakaritea te haerenga ki Whakaari, te moutere kōuaua e rere ai te korohū. Ka utautatia ngā waka ki te kai me te wai, ā, ka tono atu rātou ki a Te Tahi kia haere hei kaiwhakahaere karakia mō te hopu tītī. Me te pono o tōna ngākau, ka whakaae ia.',
		},
		image: 'https://picsum.photos/seed/journey/800/600',
	},
	{
		id: 7,
		en: {
			title: 'Left Alone',
			content:
				'On Whakaari, Te Tahi completed the rituals. The people scattered across the island to gather tītī, while the old tohunga rested in the warm sun. But when he awoke… everyone was gone. The waka. The voices. The people he trusted. All of them. Te Tahi-o-Te-Rā had been abandoned.',
		},
		mi: {
			title: 'Ka Mahue Tētahi Tangata',
			content:
				'I Whakaari, ka oti ngā karakia a Te Tahi. Ka marara te iwi ki ngā kokonga o te moutere ki te tiki tītī, ā, ka whakatā te koroua i te mahana o te rā. Engari i tōna oho—kua ngaro katoa te iwi. Kua ngaro ngā waka. Kua ngaro ngā reo. Kua ngaro ngā tāngata i arohaina e ia. Kua mahue ia ki muri.',
		},
		image: 'https://picsum.photos/seed/abandoned/800/600',
	},
	{
		id: 8,
		en: {
			title: 'Calling the Sea',
			content:
				'Standing alone on the shore, Te Tahi lifted his hands to the sky. He called upon Tangaroa, upon the taniwha of the deep, upon the ancient creatures of the ocean. His voice rolled across the waves like thunder. And from the darkness of the sea rose a mighty figure—Tūtarakauika, the chief of whales.',
		},
		mi: {
			title: 'Te Karanga ki te Moana',
			content:
				'Ka tū a Te Tahi ki te tahataha o te moana, ka hiki ake ōna ringa ki te rangi. Ka karakia ki a Tangaroa, ki ngā taniwha o te wai, ki ngā atua o te moana nui. Ka pā te reo o te tohunga ki te rāwhiti me te rāwhiti, pērā i te whatitiri. Ka pāhunu ake i te moana tētahi mea nunui—ko Tūtarakauika, te rangatira o ngā tohorā.',
		},
		image: 'https://picsum.photos/seed/calling/800/600',
	},
	{
		id: 9,
		en: {
			title: 'The Great Journey Home',
			content:
				'Tūtarakauika glided toward the shore, his massive body breaking through the waves. Te Tahi climbed onto his back. With a powerful sweep of his tail, the great whale turned toward Whakatāne. They travelled fast—so fast that the sea frothed behind them and the red hulls of the people’s waka could be seen drifting far in the distance.',
		},
		mi: {
			title: 'Te Hokinga Nui',
			content:
				'Ka kau mai a Tūtarakauika ki uta, e kī ana te ao i te kaha o tana ngaru. Ka piki a Te Tahi ki runga i tōna tuarā. Ka tahuri te tohorā, ka anga tonu ki Whakatāne. Ka tere rawa te haerenga—ka koropupū te wai ki muri, ka kitea hoki ngā waka whero o te iwi e memeha atu ana ki tua.',
		},
		image: 'https://picsum.photos/seed/whale_ride/800/600',
	},
	{
		id: 10,
		en: {
			title: 'The Unspoken Lesson',
			content:
				'When Te Tahi returned home, his people were there. The men looked at him with wide eyes, their mouths silent, their hearts shamed. Te Tahi did not shout. He did not punish. He simply said: “Waiho mā te whakamā e patu.” Let shame be the punishment. And the people understood.',
		},
		mi: {
			title: 'Te Akoranga Nui',
			content:
				'I te taenga mai ki tōna kāinga, kāore te iwi i kōrero. Ka tūtaki ngā kanohi, ka pā te whakamā. Kāore a Te Tahi i hamumu, kāore ia i riri. Ka mea noa iho ia: “Waiho mā te whakamā e patu.” Ā, ka mārama te iwi.',
		},
		image: 'https://picsum.photos/seed/lesson/800/600',
	},
	{
		id: 11,
		en: {
			title: 'Guardian of the Sea',
			content:
				'When Te Tahi-o-Te-Rā eventually left this world, his wairua returned to the ocean. There he transformed into a taniwha — a marakihau, a guardian of the deep waters. His home in Ōtara, in his underwater cave, and he travels the vast Moana-a-Toi.',
		},
		mi: {
			title: 'Te Wairua e Hoki Ana ki te Moana',
			content:
				'I te matenga o Te Tahi-o-Te-Rā, ka hoki tōna wairua ki te moana nui. Ka whakakētia ia hei taniwha ano—hei marakihau, hei kaitiaki o te Moana-a-Toi. Kei Ōtara tonu tōna rua huna, ā, ka haereere ia i te moana whānui.',
		},
		image: 'https://picsum.photos/seed/spirit/800/600',
	},
	{
		id: 12,
		en: {
			title: 'Te Tahi Today',
			content:
				'Even today, the people say: If one of his descendants is lost at sea, if the waves grow rough, if danger approaches—Te Tahi or Tūtarakauika will come. They will lift the person from the ocean, carry them safely to shore, and protect them just as they once protected the tohunga of old.',
		},
		mi: {
			title: 'Te Tahi i ēnei rā',
			content:
				'Ā mohoa noa nei e kī ana te iwi: Ki te raru tētahi uri i te moana, ki te huri ngā ngaru, ki te tata te mate—ka haere mai a Te Tahi, ka haere mai rānei a Tūtarakauika. Ka hiki mai rātou i te tangata, ka whakahoki ora ki uta, pērā tonu i tā rātou mahi i ngā rā onamata.',
		},
		image: 'https://picsum.photos/seed/today/800/600',
	},
]
