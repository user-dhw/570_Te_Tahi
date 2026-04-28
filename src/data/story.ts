export interface StoryContent {
	title: string
	content: string
}

export interface StoryPage {
	id: number
	en: StoryContent
	mi: StoryContent
	image: string
	factBox?: {
		en: string
		mi: string
	}
}

const localImage = (fileName: string) =>
	`${import.meta.env.BASE_URL}images/${fileName}`

export const storyData: StoryPage[] = [
	{
		id: 1,
		en: {
			title: 'Te Tahi-o-Te-Rā: The Guardian of Ōtara',
			content:
				'A children’s story inspired by the pūrākau of Ngāti Ngahere.',
		},
		mi: {
			title: 'Te Tahi-o-Te-Rā: Te Kaitiaki o Ōtara',
			content:
				'He pūrākau mā ngā tamariki i whakaawehia e ngā kōrero o Ngāti Ngahere.',
		},
		image: localImage('cover.png'),
	},
	{
		id: 2,
		en: {
			title: 'The Valley of Ōtara',
			content:
				'Long ago, in the peaceful valley of Ōtara, there lived a powerful guardian named Te Tahi-o-Te-Rā. His home was hidden beneath the river, inside a secret cave known as Te Ana-o-Te Tahi. Children often played near the water, but they were careful. Whenever the river began to glow like gold, they knew Te Tahi had returned—and it was time to stay away.',
		},
		mi: {
			title: 'Te Whārua o Ōtara',
			content:
				'I mua noa atu, i te whārua rangimārie o Ōtara, i reira tētahi kaitiaki whai mana e noho ana, ko Te Tahi-o-Te-Rā tōna ingoa. Ko tōna kāinga he ana huna kei raro i te awa, e mōhiotia ana ko Te Ana-o-Te Tahi. He maha ngā wā i tākaro ai ngā tamariki ki te taha o te wai, engari i tūpato rātou. Ina tīmata te awa ki te titi pērā i te koura, i mōhio rātou kua hoki mai a Te Tahi—ā, kua tae ki te wā kia matara atu.',
		},
		image: localImage('page1.png'),
	},
	{
		id: 3,
		en: {
			title: 'Feeding the Guardian',
			content:
				'The elders of the village would walk to the river carrying small baskets of food. They gently offered the food into the water and said, "Noho ora, e Te Tahi." Some believed it was a gift, others believed it was respect. But for many, it was simply tradition.',
		},
		mi: {
			title: 'Te Whāngai i te Kaitiaki',
			content:
				'Ka haere ngā kaumātua o te pā ki te awa, me ā rātou kete kai. Ka tuku māhaki rātou i te kai ki te wai, me te kī, "Noho ora, e Te Tahi." Ki ētahi he koha tēnei, ki ētahi he tohu whakanui. Engari ki te nuinga, he tikanga tuku iho noa iho.',
		},
		image: localImage('page2.png'),
	},
	{
		id: 4,
		en: {
			title: 'Te Tahi’s Lineage',
			content:
				'Te Tahi came from a strong and important lineage. He was known as a tohunga—a person with deep knowledge and great power. He helped people, protected them, and guided them when needed. But sometimes, his strength made others feel afraid.',
		},
		mi: {
			title: 'Te Whakapapa o Te Tahi',
			content:
				'I ahu mai a Te Tahi i tētahi whakapapa kaha, hira hoki. I mōhiotia ia hei tohunga—he tangata whai mōhiotanga hōhonu, whai mana nui hoki. I āwhina ia i te iwi, i tiaki i a rātou, ā, i ārahi i a rātou i ngā wā o te hiahia. Engari i ētahi wā, nā tōna kaha i puta ai te mataku i roto i ētahi atu.',
		},
		image: localImage('page3.png'),
		factBox: {
			en: 'Did you know? Te Tahi was a tohunga — an expert and spiritual leader.',
			mi: 'I mōhio rānei koe? He tohunga a Te Tahi — he tohunga matatau, he kaiārahi wairua hoki.',
		},
	},
	{
		id: 5,
		en: {
			title: 'The Sacred Rock',
			content:
				'Beside the river stood a tall rock called Te Toka-a-Houmea. This place was sacred. Here, Te Tahi performed karakia, spoke to the spiritual world, and strengthened his mana.',
		},
		mi: {
			title: 'Te Toka Tapu',
			content:
				'I te taha o te awa i tū tētahi toka tiketike e kīia ana ko Te Toka-a-Houmea. He wāhi tapu tēnei. I konei a Te Tahi i tū karakia ai, i kōrero ai ki te ao wairua, ā, i whakakaha ai i tōna mana.',
		},
		image: localImage('page4.png'),
	},
	{
		id: 6,
		en: {
			title: 'Fear Among His People',
			content:
				'As time passed, Te Tahi’s power became even stronger. But the people began to misunderstand him. They whispered among themselves, meeting quietly at night. Slowly, fear took over. And they made a decision—they would leave him behind.',
		},
		mi: {
			title: 'Te Mataku o te Iwi',
			content:
				'I te pahemo o te wā, ka kaha ake te mana o Te Tahi. Engari ka tīmata te iwi ki te pohehe ki a ia. I kōhumuhumu rātou i waenga i a rātou anō, i hui huna i te pō. Āta haere, ka riro mā te mataku e whakahaere. Ā, ka whakatau rātou—ka waiho ia ki muri.',
		},
		image: localImage('page5.png'),
	},
	{
		id: 7,
		en: {
			title: 'The Journey to Whakaari',
			content:
				'As their fear grew stronger, the people began to see Te Tahi not as a protector, but as a danger. They believed his power was too great and beyond their control. Because he was too sacred to harm, they made a secret plan to remove him from their land. They invited him on a journey to Whakaari, pretending it was for important rituals. However, their true intention was to leave him there, far from their people, out of fear and misunderstanding.',
		},
		mi: {
			title: 'Te Haerenga ki Whakaari',
			content:
				'I te kaha haere o tō rātou mataku, ka tīmata te iwi ki te titiro ki a Te Tahi ehara i te mea he kaitiaki, engari he mōrearea. I whakapono rātou he nui rawa tōna mana, ā, kei tua atu i tā rātou whakahaere. Nā te mea he tapu rawa ia kia whara, ka hangaia e rātou tētahi mahere huna kia nekehia atu ia i tō rātou whenua. I tono rātou i a ia ki tētahi haerenga ki Whakaari, me te kī he haerenga mō ngā tikanga hira. Heoi, ko tō rātou tino hiahia ko te waiho i a ia ki reira, matara atu i tō rātou iwi, nā te mataku me te pohehe.',
		},
		image: localImage('page6.png'),
		factBox: {
			en: 'Whakaari = White Island',
			mi: 'Whakaari = White Island',
		},
	},
	{
		id: 8,
		en: {
			title: 'Left Alone',
			content:
				'After completing his work, Te Tahi rested under the warm sun. When he woke up, the island was silent. The waka were gone. The people were gone. He had been left behind.',
		},
		mi: {
			title: 'Kua Mahue Ia',
			content:
				'I muri i te otinga o ana mahi, ka whakatā a Te Tahi i raro i te rā mahana. I tōna ohonga ake, kua mārie te moutere. Kua ngaro ngā waka. Kua ngaro te iwi. Kua mahue ia ki muri.',
		},
		image: localImage('page7.png'),
	},
	{
		id: 9,
		en: {
			title: 'Calling the Sea',
			content:
				'Standing alone, Te Tahi called out to the ocean. He called to Tangaroa and the creatures of the deep. His voice carried across the sea. From below the waves, a great whale appeared—Tūtarakauika.',
		},
		mi: {
			title: 'Te Karanga ki te Moana',
			content:
				'I tōna tūnga mokemoke, ka karanga atu a Te Tahi ki te moana. I karanga ia ki a Tangaroa me ngā kirehe o te hōhonu. I haruru tōna reo puta noa i te moana. Mai i raro i ngā ngaru, ka puta ake tētahi tohorā nui—ko Tūtarakauika.',
		},
		image: localImage('page8.png'),
		factBox: {
			en: 'Tangaroa = god of the sea',
			mi: 'Tangaroa = te atua o te moana',
		},
	},
	{
		id: 10,
		en: {
			title: 'The Great Journey Home',
			content:
				'Te Tahi climbed onto the whale’s back. Tūtarakauika, the chief of whales, carried him across the ocean toward home. The sea moved quickly beneath them, and far in the distance, the people’s waka could be seen.',
		},
		mi: {
			title: 'Te Hokinga Nui',
			content:
				'I piki a Te Tahi ki runga i te tuarā o te tohorā. Ko Tūtarakauika, te rangatira o ngā tohorā, i kawe i a ia puta noa i te moana ki te kāinga. I tere te neke o te moana i raro i a rātou, ā, i tawhiti, ka kitea ngā waka o te iwi.',
		},
		image: localImage('page9.png'),
		factBox: {
			en: 'Did you know? Tūtarakauika is remembered as the chief of whales.',
			mi: 'I mōhio rānei koe? E mōhiotia ana a Tūtarakauika ko te rangatira o ngā tohorā.',
		},
	},
	{
		id: 11,
		en: {
			title: 'The Unspoken Lesson',
			content:
				'When Te Tahi returned, his people stood silently before him. They felt ashamed. But Te Tahi did not punish them. Instead, he said: “Waiho mā te whakamā e patu.” Let shame be the punishment.',
		},
		mi: {
			title: 'Te Akoranga Wahangū',
			content:
				'I te hokinga mai o Te Tahi, i tū wahangū tōna iwi i tōna aroaro. I rongo rātou i te whakamā. Engari kīhai a Te Tahi i whiu i a rātou. Engari, ka kī ia: "Waiho mā te whakamā e patu."',
		},
		image: localImage('page10.png'),
		factBox: {
			en: 'Whakataukī: Waiho mā te whakamā e patu. Meaning: Let shame be the punishment.',
			mi: 'Whakataukī: Waiho mā te whakamā e patu. Tikanga: Tukuna te whakamā hei whiu.',
		},
	},
	{
		id: 12,
		en: {
			title: 'Becoming the Guardian of the Sea',
			content:
				'After Te Tahi passed away, the creatures of the sea came to him and carried him gently into the ocean. There, his wairua (spirit) became one with the waters, and he transformed into a taniwha, a guardian of the deep, watching over the ocean and protecting those in need.',
		},
		mi: {
			title: 'He Kaitiaki nō te Moana',
			content:
				'I muri i te matenga o Te Tahi, ka haere mai ngā kirehe o te moana ki a ia, ā, ka kawe māhaki i a ia ki te moana. I reira, ka tahi tōna wairua ki te wai, ā, ka whakakētia ia hei taniwha, he kaitiaki o te hōhonu, e titiro ana ki te moana, e tiaki ana i te hunga e hiahia ana ki te āwhina.',
		},
		image: localImage('page11.png'),
	},
	{
		id: 13,
		en: {
			title: 'Te Tahi Today',
			content:
				'Even today, people believe Te Tahi still protects the sea. When danger comes, he is there—guiding people safely home.',
		},
		mi: {
			title: 'Te Tahi i ēnei rā',
			content:
				'Ahakoa i ēnei rā, e whakapono ana te iwi kei te tiaki tonu a Te Tahi i te moana. Ina puta te mōrearea, kei reira ia—e ārahi ana i te iwi kia hoki ora ki te kāinga.',
		},
		image: localImage('page12.png'),
	},
]
