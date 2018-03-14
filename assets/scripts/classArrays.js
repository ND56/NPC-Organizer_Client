'use strict'

const artificer = ['Artificer', 'artificer', 'Alchemist', 'alchemist',
  'gunsmith', 'Gunsmith', 'Artificer (Alchemist)', 'Artificer (Gunsmith)', 'Artificer: Gunsmith', 'Artificer: Alchemist']

const barbarian = ['Barbarian', 'barbarian', 'Berserker', 'berserker', 'berserker barbarian', 'Berserker Barbarian', 'Barbarian: Berserker', 'Barbarian (Berserker)',
  'Totem Warrior Barbarian', 'totem warrior barbarian', 'Totem Warrior', 'totem warrior', 'Barbarian: Totem Warrior', 'Barbarian (Totem Warrior)',
  'Ancestral Guardian Barbarian', 'Ancestral Guardian', 'ancestral guardian', 'Barbarian: Ancestral Guardian', 'Barbarian (Ancestral Guardian)',
  'ancestral guardian barbarian', 'storm herald barbarian', 'Barbarian: Storm Herald', 'Barbarian (Storm Herald)',
  'Storm Herald Barbarian', 'Storm Herald', 'storm herald', 'Zealot', 'zealot barbarian', 'Barbarian: Zealot', 'Barbarian (Zealot)',
  'Zealot Barbarian', 'zealot', 'Battlerager', 'battlerager', 'Battlerager Barbarian', 'battlerager barbarian', 'Barbarian: Battle Rager', 'Barbarian (Battle Rager)']

const bard = ['Bard', 'bard', 'College', 'college', 'College of Glamour', 'College of Lore', 'College of Satire',
  'College of Swords', 'College of Valor', 'College of Whispers',
  'Bard of Glamour', 'Bard of Lore', 'Bard of Satire', 'Bard of Swords',
  'Bard of Valor', 'Bard of Whispers',
  'bard of glamour', 'bard of lore', 'bard of satire', 'bard of swords',
  'bard of valor', 'bard of whispers',
  'Bard: College of Swords', 'Bard: College of Valor', 'Bard: College of Whispers',
  'Bard: College of Glamour', 'Bard: College of Lore', 'Bard: College of Satire',
  'Bard (College of Swords)', 'Bard (College of Valor)', 'Bard (College of Whispers)',
  'Bard (College of Glamour)', 'Bard (College of Lore)', 'Bard (College of Satire)']

const cleric = ['Cleric', 'cleric', 'Arcana', 'arcana', 'Death', 'death',
  'Forge', 'forge', 'Grave', 'grave', 'Knowledge',
  'knowledge', 'Life', 'life', 'Light', 'light', 'Nature',
  'nature', 'Tempest', 'tempest', 'trickery', 'Trickery',
  'War', 'war',
  'Arcana Cleric', 'arcana cleric', 'Death Cleric', 'death cleric',
  'Forge Cleric', 'forge cleric', 'Grave Cleric', 'grave cleric', 'Knowledge cleric',
  'knowledge cleric', 'Life Cleric', 'life cleric', 'Light Cleric', 'light cleric', 'Nature Cleric',
  'nature cleric', 'Tempest Cleric', 'tempest cleric', 'trickery cleric', 'Trickery Cleric',
  'War Cleric', 'war cleric',
  'Cleric of Arcana', 'cleric of arcana', 'Cleric of Death', 'cleric of death',
  'Cleric of the Forge', 'cleric of the forge', 'Cleric of the Grave', 'cleric of the grave', 'Cleric of Knowledge',
  'cleric of knowledge', 'Cleric of Life', 'cleric of life', 'Cleric of Light', 'cleric of light', 'Cleric of Nature',
  'cleric of nature', 'Cleric of the Tempest', 'cleric of the tempest', 'cleric of trickery', 'Cleric of Trickery',
  'Cleric of War', 'cleric of war',
  'Cleric: Arcana', 'Cleric: arcana', 'Cleric: Death', 'Cleric: death',
  'Cleric: Forge', 'Cleric: forge', 'Cleric: Grave', 'Cleric: grave', 'Cleric: Knowledge',
  'Cleric: knowledge', 'Cleric: Life', 'Cleric: life', 'Cleric: Light', 'Cleric: light', 'Cleric: Nature',
  'Cleric: nature', 'Cleric: Tempest', 'Cleric: tempest', 'Cleric: trickery', 'Cleric: Trickery',
  'Cleric: War', 'Cleric: war',
  'Cleric (Arcana)', 'Cleric: arcana', 'Cleric (Death)', 'Cleric: death',
  'Cleric (Forge)', 'Cleric: forge', 'Cleric (Grave)', 'Cleric: grave', 'Cleric (Knowledge)',
  'Cleric: knowledge', 'Cleric (Life)', 'Cleric: life', 'Cleric (Light)', 'Cleric: light', 'Cleric (Nature)',
  'Cleric: nature', 'Cleric (Tempest)', 'Cleric: tempest', 'Cleric: trickery', 'Cleric (Trickery)',
  'Cleric (War)', 'Cleric: war']

const druid = ['Druid', 'druid', 'Druid of the Land', 'druid of the land', 'Circle of the Land', 'circle', 'Arctic Druid', 'Druid of the Arctic', 'Druid of the Coast', 'Coastal Druid', 'Desert Druid', 'coastal druid', 'druid of the coast', 'desert druid', 'Druid of the Desert', 'druid of the desert', 'Forest Druid', 'forest druid', 'Druid of the Forest',
  'druid of the forest', 'Grasslands Druid', 'grasslands druid', 'Druid of the Grasslands', 'druid of the grasslands', 'Mountain Druid', 'mountain druid', 'Druid of the Mountain', 'druiud of the mountain', 'Swamp Druid', 'swamp druid', 'Druid of the Swamp', 'druid of the swamp', 'Druid of the Underdark', 'druid of the underdark', 'Underdark Druid', 'underdark druid',
  'Druid of the Moon', 'druid of the moon', 'Moon Druid', 'moon druid', 'Circle of the Moon', 'circle of the moon', 'Druid, Circle of the Land', 'Druid, Circle of the Moon', 'Druid (Circle of the Land)', 'Druid (Circle of the Moon)', 'Circle of Dreams', 'circle of dreams', 'Druid of Dreams', 'Druid of the Circle of Dreams', 'Druid (Circle of Dreams)',
  'Circle of the Shepherd', 'Shepherd Druid', 'circle of the shepherd', 'shepherd druid', 'Druid (Circle of the Shepherd)', 'druid (circle of the shepherd)', 'Circle of Twilight', 'Circle of Spores', 'Druid (Circle of Twilight)', 'Druid (Circle of Spores)',
  'Druid: Circle of the Land', 'Druid: Circle of the Moon', 'Druid: Circle of the Shepherd', 'Druid: Circle of Dreams', 'Druid: Circle of Spores', 'Druid: Circle of Twilight']

const fighter = ['Fighter', 'fighter', 'Champion', 'champion',
  'Battle Master', 'battle master', 'Eldritch Knight',
  'eldritch knight', 'Arcane Archer', 'arcane archer',
  'Cavalier', 'cavalier', 'Samurai', 'samurai',
  'Monster Hunter', 'monster hunter', 'Sharpshooter',
  'sharpshooter', 'brute', 'Brute',
  'Champion Fighter', 'champion fighter',
  'Battle Master Fighter', 'battle master fighter', 'Eldritch Knight Fighter',
  'eldritch knight fighter', 'Arcane Archer Fighter', 'arcane archer fighter',
  'Cavalier Fighter', 'cavalier fighter', 'Samurai Fighter', 'samurai fighter',
  'Monster Hunter Fighter', 'monster hunter fighter', 'Sharpshooter Fighter',
  'sharpshooter fighter', 'brute fighter', 'Brute Fighter',
  'Champion Fighter', 'champion fighter',
  'Fighter (Battle Master)', 'fighter (battle master)', 'Fighter (Eldritch Knight)',
  'Fighter (eldritch knight)', 'Fighter (Arcane Archer)', 'Fighter (arcane archer)',
  'Fighter (Cavalier)', 'Fighter (cavalier)', 'Fighter (Samurai)', 'Fighter (samurai)',
  'Fighter (Monster Hunter)', 'Fighter (monster hunter)', 'Fighter (Sharpshooter)',
  'Fighter (sharpshooter)', 'Fighter (brute)', 'Fighter (Brute)',
  'Fighter: Battle Master', 'fighter: battle master', 'Fighter: Eldritch Knight',
  'Fighter: eldritch knight', 'Fighter: Arcane Archer', 'Fighter: arcane archer',
  'Fighter: Cavalier', 'Fighter: cavalier', 'Fighter: Samurai', 'Fighter: samurai',
  'Fighter: Monster Hunter', 'Fighter: monster hunter', 'Fighter: Sharpshooter',
  'Fighter: sharpshooter', 'Fighter: brute', 'Fighter: Brute']

const monk = ['Monk', 'monk', 'Way of the Open Hand', 'Monk (Way of the Open Hand)', 'Monk of the Open Hand', 'Monk: Way of the Open Hand',
  'Way of the Shadow', 'Monk of the Shadow', 'Monk (Way of the Shadow)', 'Monk: Way of the Shadow',
  'Way of the Four Elements', 'Monk of the Four Elements', 'Monk (Way of the Four Elements)', 'Monk: Way of the Four Elements',
  'Way of the Drunken Master', 'Monk of the Drunken Master', 'Monk (Way of the Drunken Master), Monk: Way of the Drunken Master',
  'Way of the Kensei', 'Monk of the Kensei', 'Monk (Way of the Kensei)', 'Monk: Way of the Kensei',
  'Way of Tranquility', 'Monk of Tranquility', 'Monk (Way of Tranquility)', 'Monk: Way of Tranquility',
  'Way of the Sun Soul', 'Monk (Way of the Sun Soul)', 'Monk: Way of the Sun Soul', 'Monk of the Sun Soul']

const mystic = ['Mystic', 'mystic', 'Order of', 'order of', 'Order',
  'order', 'Order of the Avatar', 'order of the avatar',
  'Order of the awakened', 'order of the immortal', 'Mystic of the Awakened', 'Mystic (Order of the Awakened)', 'Mystic: Order of the Awakened',
  'Order of the Awakened', 'order of the immortal', 'Mystic of the Immortal', 'Mystic (Order of the Immortal)', 'Mystic: Order of the Immortal',
  'Order of the Nomad', 'order of the nomad', 'Mystic of the Nomad', 'Mystic (Order of the Nomad)', 'Mystic: Order of the Nomad',
  'Order of the Soul Knife', 'order of the soul knife', 'Mystic of the Soul Knife', 'mystic of the soul knife', 'Mystic (Order of the Soul Knife)', 'Mystic: Order of the Soul Knife',
  'Order of the Wu Jen', 'order of the wu jen', 'Mystic of the Wu Jen', 'Mystic (Order of the Wu Jen)', 'Mystic: Order of the Wu Jen']

const paladin = ['Paladin', 'paladin',
  'Oath of Devotion', 'Paladin (Oath of Devotion)', 'Paladin: Oath of Devotion', 'Paladin of Devotion',
  'Oath of the Ancients', 'Paladin: Oath of the Ancients', 'Paladin (Oath of the Ancients)', 'Paladin of the Ancients',
  'Oath of Vengeance', 'Paladin of Vengeance', 'Paladin: Oath of Vengeance', 'Paladin (Oath of Vengeance)',
  'Oath of Conquest', 'Paladin of Conquest', 'Paladin: Oath of Conquest', 'Paladin (Oath of Conquest)',
  'Oath of Redemption', 'Paladin of Redemption', 'Paladin (Oath of Redemption)', 'Paladin: Oath of Redemption',
  'Oath of the Crown', 'Paladin of the Crown', 'Paladin: Oath of the Crown', 'Paladin (Oath of the Crown)',
  'Oath of the Treachery', 'Paladin of Treachery', 'Paladin: Oath of Treachery', 'Paladin (Oath of Treachery)']

const ranger = ['Ranger', 'ranger', 'Hunter', 'hunter', 'Beast Master',
  'beast master', 'gloom stalker', 'Gloom Stalker',
  'Horizon Walker', 'horizon walker', 'monster slayer',
  'Monster Slayer', 'Primeval Guardian', 'primeval guardian',
  'Ranger: Hunter', 'ranger: hunter', 'Ranger: Beast Master',
  'ranger: beast master', 'ranger: gloom stalker', 'Ranger: Gloom Stalker',
  'Ranger: Horizon Walker', 'ranger: horizon walker', 'ranger: monster slayer',
  'Ranger: Monster Slayer', 'Ranger: Primeval Guardian', 'ranger: primeval guardian',
  'Ranger (Hunter)', 'ranger (hunter)', 'Ranger (Beast Master)',
  'ranger (beast master)', 'ranger (gloom stalker)', 'Ranger (Gloom Stalker)',
  'Ranger (Horizon Walker)', 'ranger (horizon walker)', 'ranger (monster slayer)',
  'Ranger (Monster Slayer)', 'Ranger (Primeval Guardian)', 'ranger (primeval guardian)']

const rogue = ['Rogue', 'rogue', 'thief', 'Thief', 'Assassin', 'assassin',
  'arcane trickster', 'Arcane Trickster', 'Inquisitive',
  'inquisitive', 'Mastermind', 'mastermind', 'Scout', 'scout',
  'Swashbuckler', 'swashbuckler',
  'rogue: thief', 'Rogue: Thief', 'Rogue: Assassin', 'rogue: assassin',
  'rogue: arcane trickster', 'Rogue: Arcane Trickster', 'Rogue: Inquisitive',
  'rogue: inquisitive', 'Rogue: Mastermind', 'rogue: mastermind', 'Rogue: Scout', 'rogue: scout',
  'Rogue: Swashbuckler', 'rogue: swashbuckler',
  'rogue (thief)', 'Rogue (Thief)', 'Rogue (Assassin)', 'rogue (assassin)',
  'rogue (arcane trickster)', 'Rogue (Arcane Trickster)', 'Rogue (Inquisitive)',
  'rogue (inquisitive)', 'Rogue (Mastermind)', 'rogue (mastermind)', 'Rogue (Scout)', 'rogue (scout)',
  'Rogue (Swashbuckler)', 'rogue (swashbuckler)']

const sorcerer = ['Sorcerer', 'sorcerer', 'Draconic', 'draconic', 'Wild',
  'Wild', 'Divine Soul', 'divine soul', 'Shadow Magic',
  'shadow magic', 'Storm Sorcery', 'storm sorcery',
  'Phoenix Sorcery', 'phoenix sorcery', 'Sea Sorcery',
  'sea sorcery', 'Stone Sorcery', 'stone sorcery',
  'Draconic Bloodline', 'Sorcerer: Draconic Bloodline', 'Sorcerer (Draconic Bloodline)', 'Draconic Sorcerer', 'Draconic Bloodline Sorcerer', 'Draconic Spellcaster',
  'Wild Magic', 'Wild Sorcerer', 'Sorcerer of Wild Magic', 'Sorcerer (Wild Magic)', 'Sorcerer: Wild Magic', 'Wild Magic Sorcerer',
  'Divine Soul', 'Sorcerer of Divine Soul', 'Divine Soul Sorcerer', 'Sorcerer: Divine Soul', 'Sorcerer (Divine Soul)',
  'Shadow Sorcery Sorcerer', 'Shadow Sorcerer', 'Sorcerer (Shadow Magic)', 'Sorcerer: Shadow Magic', 'Sorcerer of Shadow Magic',
  'Storm Sorcery Sorcerer', 'Storm Sorcery', 'Sorcerer of Storm Sorcery', 'Sorcerer of the Storm', 'Sorcerer: Storm Sorcery', 'Sorcerer (Storm Sorcery)',
  'Phoenix Sorcery Sorcerer', 'Phoenix Sorcery', 'Sorcerer of Phoenix Sorcery', 'Sorcerer of the Phoenix', 'Sorcerer: Phoenix Sorcery', 'Sorcerer (Phoenix Sorcery)',
  'Sea Sorcery Sorcerer', 'Sea Sorcery', 'Sorcerer of Sea Sorcery', 'Sorcerer of the Sea', 'Sorcerer: Sea Sorcery', 'Sorcerer (Sea Sorcery)',
  'Stone Sorcery Sorcerer', 'Stone Sorcery', 'Sorcerer of Stone Sorcery', 'Sorcerer of the Stone', 'Sorcerer: Stone Sorcery', 'Sorcerer (Stone Sorcery)']

const warlock = ['Warlock', 'warlock', 'Archfey', 'archfey', 'Fey', 'fey',
  'Celestial', 'celestial', 'Fiend', 'fiend',
  'Great Old One', 'Hexblade', 'hexblade', 'Raven Queen',
  'raven queen', 'Seeker', 'seeker', 'Undying', 'undying',
  'Pact of', 'pact of',
  'Archfey Warlock', 'Warlock: Archfey', 'Warlock (Archfey)', 'Pact of the Archfey', 'Warlock: Pact of the Archfey', 'Warlock (Pact of the Archfey)',
  'Celestial Warlock', 'Warlock: Celestial', 'Warlock (Celestial)', 'Pact of the Celestial', 'Warlock: Pact of the Celestial', 'Warlock (Pact of the Celestial)',
  'Fiend Warlock', 'Warlock: Fiend', 'Warlock (Fiend)', 'Pact of the Fiend', 'Warlock: Pact of the Fiend', 'Warlock (Pact of the Fiend)',
  'Great Old One Warlock', 'Warlock: Great Old One', 'Warlock (Great Old One)', 'Pact of the Great Old One', 'Warlock: Pact of the Great Old One', 'Warlock (Pact of the Great Old One)',
  'Hexblade Warloack', 'Hexblade Warlock', 'Warlock: Archfey', 'Warlock (Archfey)', 'Pact of the Archfey', 'Warlock: Pact of the Archfey', 'Warlock (Pact of the Archfey)',
  'Raven Queen Warlock', 'Warlock: Raven Queen', 'Warlock (Raven Queen)', 'Pact of the Raven Queen', 'Warlock: Pact of the Raven Queen', 'Warlock (Pact of the Raven Queen)',
  'Seeker Warlock', 'Warlock: Seeker', 'Warlock (Seeker)', 'Pact of the Seeker', 'Warlock: Pact of the Seeker', 'Warlock (Pact of the Seeker)',
  'Undying Warlock', 'Warlock: Undying', 'Warlock (Undying)', 'Pact of the Undying', 'Warlock: Pact of the Undying', 'Warlock (Pact of the Undying)']

const wizard = ['Wizard', 'wizard', 'Abjurer', 'abjurer', 'abjuration',
  'Abjuration', 'Bladesinger', 'Bladesinging', 'bladesinger',
  'bladesinging', 'Conjuror', 'conjuror', 'Conjuration', 'conjurer', 'Conjurer',
  'conjuration', 'Diviner', 'diviner', 'Divination',
  'divination', 'Enchanter', 'enchanter', 'Evocatator',
  'evocatator', 'Evocateur', 'evocateur', 'Evocation',
  'evocation', 'Illusionist', 'illusionist', 'Illusion',
  'illusion', 'Lore Master', 'lore master', 'Necromancer',
  'necromancer', 'necromancy', 'Necromancy', 'Technomancy',
  'technomany', 'Technomancer', 'technomancer',
  'theurgy', 'Theurgy', 'Theurgist', 'theurgist',
  'Transmutation', 'transmutation', 'transmuter',
  'Transmuter', 'transmutor', 'Transmutor',
  'war magic', 'War Magic', 'Mage', 'mage', 'magician',
  'Magician',
  'Wizard: Abjurer', 'Wizard: Abjuration', 'Wizard (Abjurer)', 'Wizard (Abjuration)', 'Abjuration Wizard', 'Wizard of Abjuration',
  'Wizard: Bladesinger', 'Wizard: Bladesinging', 'Wizard (Bladesinger)', 'Wizard (Bladesinging)', 'Bladesinging Wizard', 'Wizard of Bladesinging', 'Bladesinger Wizard',
  'Wizard: Conjuror', 'Wizard: Conjuration', 'Wizard (Conjuror)', 'Wizard (Conjuration)', 'Conjuration Wizard', 'Wizard of Conjuration', 'Wizard: Conjurer', 'Wizard (Conjurer)', 'Conjurer Wizard', 'Conjuror Wizard',
  'Wizard: Diviner', 'Wizard: Divination', 'Wizard (Diviner)', 'Wizard (Divination)', 'Divination Wizard', 'Wizard of Divination', 'Wizard: Diviner', 'Wizard (Conjurer)', 'Conjurer Wizard', 'Conjuror Wizard',
  'Wizard: Enchanter', 'Wizard: Enchanting', 'Wizard (Enchanter)', 'Wizard (Enchanting)', 'Enchanting Wizard', 'Wizard of Enchanting', 'Wizard: Enchantment', 'Wizard (Enchantment)', 'Wizard of Enchantment', 'Enchantment Wizard',
  'Wizard: Evocation', 'Wizard: Evocator', 'Wizard (Evocator)', 'Wizard (Evocation)', 'Evocation Wizard', 'Wizard of Evocation', 'Evocator Wizard', 'Evocateur Wizard', 'Wizard (Evocateur)', 'Wizard: Evocateur',
  'Wizard: Illusionist', 'Wizard: Illusion', 'Wizard (Illusionist)', 'Wizard (Illusion)', 'Illusionist Wizard', 'Wizard of Illusion',
  'Wizard: Lore Master', 'Wizard: Lore Mastery', 'Wizard (Lore Master)', 'Wizard (Lore Mastery)', 'Lore Master Wizard', 'Wizard of Lore Mastery', 'Lore Mastery Wizard', 'Lore Master Wizard',
  'Wizard: Necoromancer', 'Wizard: Necromancy', 'Wizard (Necromancer)', 'Wizard (Necromancy)', 'Necromancy Wizard', 'Wizard of Necromancy', 'Necromancer Wizrd',
  'Wizard: Technomancer', 'Wizard: Technomancy', 'Wizard (Technomancer)', 'Wizard (Technomancy)', 'Technomancer Wizard', 'Wizard of Technomancy', 'Wizard: Enchantment', 'Wizard (Enchantment)', 'Wizard of Enchantment', 'Enchantment Wizard',
  'Wizard: Theurgy', 'Wizard: Theurgist', 'Wizard (Theurgy)', 'Wizard (Theurgist)', 'Theurgy Wizard', 'Wizard of Theurgy', 'Wizard: Enchantment', 'Wizard (Enchantment)', 'Wizard of Enchantment', 'Theurgist Wizard',
  'Wizard: Transmutor', 'Wizard: Transmutation', 'Wizard (Transmutor)', 'Wizard (Transmutation)', 'Transmutor Wizard', 'Wizard of Transmutation', 'Wizard: Enchantment', 'Wizard (Enchantment)', 'Wizard of Enchantment', 'Enchantment Wizard',
  'Wizard: War Magic', 'Wizard: War Magician', 'Wizard (War Magic)', 'Wizard (War Magician)', 'War Magic Wizard', 'Wizard of War Magic', 'Wizard: Enchantment', 'Wizard (Enchantment)', 'Wizard of Enchantment', 'War Magician Wizard',
  'Wizard: Enchanter', 'Wizard: Enchanting', 'Wizard (Enchanter)', 'Wizard (Enchanting)', 'Enchanting Wizard', 'Wizard of Enchanting', 'Wizard: Enchantment', 'Wizard (Enchantment)', 'Wizard of Enchantment', 'Enchantment Wizard',
  'Battle Mage', 'Battle Wizard', 'Wizard (Battle Magic)', 'Wizard (Battle Mage)', 'Wizard: Battle Magic', 'Wizard: Battle Mage']

const aasimar = ['Aasimar', 'aasimar', 'Protector Aasimar', 'protector aasimar', 'Scourge Aasimar',
  'scourge aasimar', 'fallen aasimar', 'Fallen Aasimar',
  'Aasimar: Protector', 'Aasimar (Protector)',
  'Aasimar: Scourge', 'Aasimar (Scourge)',
  'Aasimar: Fallen', 'Aasimar (Fallen)']

const bugbear = ['Bugbear', 'bugbear']

const dragonborn = ['Dragonborn', 'dragonborn', 'Dragon', 'dragon', 'Draconic',
  'draconic', 'Drake-Born', 'drake-born', 'Dragon-touched']

const dwarf = ['Dwarf', 'dwarf', 'Dwarven', 'dwarven', 'Dwarfen', 'dwarfen',
  'Duergar', 'duergar', 'gray dwarf', 'Gray Dwarf', 'Grey Dwarf',
  'grey dwarf', 'Hill Dwarf', 'hill dwarf', 'Gold Dwarf', 'gold dwarf',
  'Mountain Dwarf', 'mountain dwarf', 'Shield Dwarf', 'shield dwarf',
  'Dwarf: Duergar', 'Dwarf (Duergar)',
  'Dwarf: Grey', 'Dwarf (Grey)',
  'Dwarf: Gray', 'Dwarf (Gray)',
  'Dwarf: Hill', 'Dwarf (Hill)',
  'Dwarf: Gold', 'Dwarf (Gold)',
  'Dwarf: Mountain', 'Dwarf (Mountain)',
  'Dwarf: Shield', 'Dwarf (Shield)']

const elf = ['Elf', 'elf', 'Elven', 'elven', 'Elfin', 'elfin', 'Elfen', 'elfen',
  'High Elf', 'high elf', 'Wood Elf', 'wood elf', 'Drow', 'drow',
  'Dark Elf', 'dark elf', 'Aquatic Elf', 'aquatic elf', 'Avariel',
  'avariel', 'Eladrin', 'eladrin', 'Sea Elf', 'sea elf', 'Grugach',
  'grugach', 'Shadar-kai', 'shadar-kai',
  'Elf: High', 'Elf (High)',
  'Elf: Wood', 'Elf (Wood)',
  'Elf: Drow', 'Elf (Drow)',
  'Elf: Dark', 'Elf (Dark)',
  'Elf: Aquatic', 'Elf (Aquatic)',
  'Elf: Sea', 'Elf (Sea)',
  'Elf: Avariel', 'Elf (Avariel)',
  'Elf: Eladrin', 'Elf (Eladrin)',
  'Elf: Grugach', 'Elf (Grugach)',
  'Elf: Shadar-Kai', 'Elf (Shadar-Kai)']

const firbolg = ['Firbolg', 'firbolg']

const fey = ['Fey', 'fey', 'Feyborn', 'feyborn', 'feytouched', 'Feytouched',
  'Fey-Born', 'fey-born', 'Fey-Touched', 'fey-touched']

const gensai = ['Gensai', 'gensai', 'Air', 'air', 'Earth', 'earth', 'Fire', 'fire',
  'water', 'Water', 'Air Gensai', 'Earth Gensai', 'Fire Gensai', 'Water Gensai', 'Gensai of Air', 'Gensai of Water', 'Gensai of Fire', 'Gensai of Earth',
  'Gensai: Air', 'Gensai (Air)',
  'Gensai: Earth', 'Gensai (Earth)',
  'Gensai: Fire', 'Gensai (Fire)',
  'Gensai: Water', 'Gensai (Water)']

const gnome = ['Gnome', 'gnome', 'Forest Gnome', 'forest gnome', 'Rock Gnome',
  'rock gnome', 'Deep Gnome', 'deep gnome', 'Svirfneblin',
  'svirfneblin',
  'Gnome: Forest', 'Gnome (Forest)',
  'Gnome: Rock', 'Gnome (Rock)',
  'Gnome: Deep', 'Gnome (Deep)',
  'Gnome: Svirfneblin', 'Gnome (Svirfneblin)']

const goblin = ['Goblin', 'goblin', 'Goblinoid', 'goblinoid', 'Hobgoblin',
  'hobgoblin']

const troll = ['Troll', 'troll']

const goliath = ['Goliath', 'goliath']

const halfelf = ['Half-Elf', 'half-elf', 'Half-Elven', 'half-elven', 'Half-Eflin',
  'half-elfin', 'Half Elf', 'half elf']

const halforc = ['Half-Orc', 'half-orc', 'Orc', 'orc', 'half orc', 'Half Orc']

const halfling = ['Halfling', 'halfling', 'Hobbit', 'hobbit', 'Ghostwise',
  'ghostwise', 'Lightfoot', 'lightfoot', 'Stout', 'stout',
  'Halfling: Hobbit', 'Halfling (Hobbit)',
  'Halfling: Ghostwise', 'Halfling (Ghostwise)',
  'Halfling: Lightfoot', 'Halfling (Lightfoot)',
  'Halfling: Stout', 'Halfling (Stout)']

const human = ['Human', 'human']

const kenku = ['Kenku', 'kenku', 'Auran', 'auran', 'Avian', 'avian']

const kobold = ['Kobold', 'kobold']

const lizardfolk = ['Lizardfolk', 'lizardfolk', 'lizard', 'Lizard']

const tabaxi = ['Tabaxi', 'tabaxi']

const tiefling = ['Tiefling', 'tiefling']

const tortle = ['Tortle', 'tortle']

const triton = ['Triton', 'triton', 'Merfolk', 'merfolk']

const yuanti = ['Yuan-Ti Pureblood', 'yuan-ti pureblood', 'Yuan-Ti', 'yuan-ti',
  'Yuan', 'yuan', 'Pureblood', 'Yuan-Ti: Pureblood', 'Yuan-Ti (Pureblood)']

const gith = ['Gith', 'gith', 'Githyanki', 'githyanki', 'Githzerai', 'githzerai', 'Gith: Githyanky', 'Gith (Githyanki)', 'Gith: Githzerai', 'Gith (Githzerai)']

module.exports = {
  artificer,
  barbarian,
  bard,
  cleric,
  wizard,
  sorcerer,
  ranger,
  rogue,
  mystic,
  warlock,
  druid,
  fighter,
  monk,
  paladin,
  aasimar,
  dragonborn,
  dwarf,
  elf,
  firbolg,
  fey,
  gensai,
  gnome,
  goblin,
  troll,
  goliath,
  halfelf,
  halforc,
  halfling,
  human,
  kenku,
  kobold,
  lizardfolk,
  tabaxi,
  gith,
  yuanti,
  tiefling,
  tortle,
  triton,
  bugbear
}
