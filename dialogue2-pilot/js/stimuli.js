// pseudorandomised list of production stimuli
// [order, block, picture, id, type]
var stimuli_production_1 = [
	[0, 0, "pizza.png", 0, "PRC"],
	[0, 0, "fork.png", 0, "PRC"],
	[0, 0, "handheldfan.png", 0, "PRC"],
	[1, 1, "trashcan-bin.png", 1, "ABE"],
	[2, 1, "hammer.png", 2, "FIL"],
	[3, 1, "candle.png", 3, "FIL"],
	[4, 1, "carrot.png", 4, "FIL"],
	[5, 1, "guitar.png", 5, "FIL"],
	[6, 1, "tomato.png", 6, "FIL"],
	[7, 1, "bird-canary.png", 7, "SYN"],
	[8, 1, "faucet-tap.png", 8, "ABE"],
	[9, 1, "diaper-nappy.png", 9, "ABE"],
	[10, 1, "umbrella.png", 10, "FIL"],
	[11, 1, "stove-cooker.png", 11, "ABE"],
	[12, 1, "fan.png", 12, "FIL"],
	[13, 1, "can-tin.png", 13, "ABE"],
	[14, 1, "bottle.png", 14, "FIL"],
	[15, 1, "stone-rock.png", 15, "SYN"],
	[16, 1, "snake-serpent.png", 16, "SYN"],
	[17, 1, "frog-toad.png", 17, "SYN"],
	[18, 1, "mailbox-postbox.png", 18, "ABE"],
	[19, 1, "cheese.png", 19, "FIL"],
	[20, 1, "vest-waistcoat.png", 20, "ABE"],
	[21, 1, "bus-coach.png", 21, "SYN"],
	[22, 1, "gun-pistol.png", 22, "SYN"],
	[23, 1, "pizza.png", 23, "FIL"],
	[24, 1, "fridge-refrigerator.png", 24, "FIL"],
	[25, 1, "veranda-porch.png", 25, "SYN"],
	[26, 1, "house-mansion.png", 26, "SYN"],
	[27, 1, "violin-fiddle.png", 27, "ABE"],
	[28, 1, "chips-crisps.png", 28, "ABE"],
	[29, 1, "pear.png", 29, "FIL"],
	[30, 1, "crib-cot.png", 30, "ABE"],
	[31, 1, "skirt.png", 31, "FIL"],
	[32, 1, "bird-sparrow.png", 32, "SYN"],
	[33, 1, "truck-lorry.png", 33, "ABE"],
	[34, 1, "cart-trolley.png", 34, "ABE"],
	[35, 1, "arrow.png", 35, "FIL"],
	[36, 1, "monkey-ape.png", 36, "SYN"],
	[37, 1, "couch-sofa.png", 37, "SYN"],
	[38, 1, "axe-hatchet.png", 38, "SYN"],
	[39, 1, "bench.png", 39, "FIL"],
	[40, 1, "barbecue.png", 40, "FIL"],
	[41, 1, "turtle-tortoise.png", 41, "SYN"],
	[42, 1, "dog-poodle.png", 42, "SYN"],
	[43, 1, "plane-aeroplane.png", 43, "ABE"],
	[44, 1, "fish-salmon.png", 44, "SYN"],
	[45, 1, "lipstick.png", 45, "FIL"],
	[46, 1, "trumpet.png", 46, "FIL"],
	[47, 1, "dress-gown.png", 47, "SYN"],
	[48, 1, "cocktail-drink.png", 48, "SYN"],
	[49, 1, "juice-drink.png", 49, "SYN"],
	[50, 1, "bag-sack.png", 50, "SYN"],
	[51, 2, "basket.png", 51, "FIL"],
	[52, 2, "sled-sledge.png", 52, "ABE"],
	[53, 2, "chair.png", 53, "FIL"],
	[54, 2, "doll.png", 54, "FIL"],
	[55, 2, "glasses-spectacles.png", 55, "SYN"],
	[56, 2, "suitcase.png", 56, "FIL"],
	[57, 2, "shovel-spade.png", 57, "SYN"],
	[58, 2, "cake-pie.png", 58, "SYN"],
	[59, 2, "car-convertible.png", 59, "SYN"],
	[60, 2, "wheat-grain.png", 60, "SYN"],
	[61, 2, "spoon.png", 61, "FIL"],
	[62, 2, "balloon.png", 62, "FIL"],
	[63, 2, "fork.png", 63, "FIL"],
	[64, 2, "elevator-lift.png", 64, "ABE"],
	[65, 2, "scarf.png", 65, "FIL"],
	[66, 2, "fishsticks-fishfingers.png", 66, "ABE"],
	[67, 2, "boat-ship.png", 67, "SYN"],
	[68, 2, "boots-shoes.png", 68, "SYN"],
	[69, 2, "zipper-zip.png", 69, "ABE"],
	[70, 2, "bandaid-plaster.png", 70, "ABE"],
	[71, 2, "sword-dagger.png", 71, "SYN"],
	[72, 2, "lock.png", 72, "FIL"],
	[73, 2, "cake.png", 73, "FIL"],
	[74, 2, "iron.png", 74, "FIL"],
	[75, 2, "garden-yard.png", 75, "ABE"],
	[76, 2, "pigeon-dove.png", 76, "SYN"],
	[77, 2, "pants-trousers.png", 77, "ABE"],
	[78, 2, "parrot-bird.png", 78, "SYN"],
	[79, 2, "costume-fancydress.png", 79, "ABE"],
	[80, 2, "scissors.png", 80, "FIL"],
	[81, 2, "chicken-hen.png", 81, "SYN"],
	[82, 2, "barrel-keg.png", 82, "SYN"],
	[83, 2, "shrimp-prawn.png", 83, "ABE"],
	[84, 2, "belt.png", 84, "FIL"],
	[85, 2, "razor.png", 85, "FIL"],
	[86, 2, "apron.png", 86, "FIL"],
	[87, 2, "taxi-cab.png", 87, "SYN"],
	[88, 2, "beetle-bug.png", 88, "SYN"],
	[89, 2, "lilly-flower.png", 89, "SYN"],
	[90, 2, "ladybird-ladybug.png", 90, "ABE"],
	[91, 2, "espresso-coffee.png", 91, "SYN"],
	[92, 2, "jacket-coat.png", 92, "SYN"],
	[93, 2, "banana.png", 93, "FIL"],
	[94, 2, "lemon.png", 94, "FIL"],
	[95, 2, "carpet-rug.png", 95, "SYN"],
	[96, 2, "dog-beagle.png", 96, "SYN"],
	[97, 2, "flash-torch.png", 97, "ABE"],
	[98, 2, "clock.png", 98, "FIL"],
	[99, 2, "pillow.png", 99, "FIL"],
	[100, 3, "shirt-blouse.png", 100, "SYN"],
	[101, 3, "zucchini-courgette.png", 101, "ABE"],
	[102, 3, "key.png", 102, "FIL"],
	[103, 3, "licenseplate-numberplate.png", 103, "ABE"],
	[104, 3, "store-shop.png", 104, "SYN"],
	[105, 3, "jar-jug.png", 105, "SYN"],
	[106, 3, "sheep-lamb.png", 106, "SYN"],
	[107, 3, "bed.png", 107, "FIL"],
	[108, 3, "monkey-chimp.png", 108, "SYN"],
	[109, 3, "backpack-rucksack.png", 109, "ABE"],
	[110, 3, "saxophone.png", 110, "FIL"],
	[111, 3, "buffalo-bison.png", 111, "SYN"],
	[112, 3, "lamp.png", 112, "FIL"],
	[113, 3, "fries-chips.png", 113, "ABE"],
	[114, 3, "bike-bicycle.png", 114, "SYN"],
	[115, 3, "pineapple.png", 115, "FIL"],
	[116, 3, "battery.png", 116, "FIL"],
	[117, 3, "rabbit-bunny.png", 117, "SYN"],
	[118, 3, "rose-flower.png", 118, "SYN"],
	[119, 3, "sweater-jumper.png", 119, "ABE"],
	[120, 3, "candy-sweets.png", 120, "ABE"],
	[121, 3, "feather-plume.png", 121, "SYN"],
	[122, 3, "pencil.png", 122, "FIL"],
	[123, 3, "whistle.png", 123, "FIL"],
	[124, 3, "baguette-bread.png", 124, "SYN"],
	[125, 3, "eraser-rubber.png", 125, "ABE"],
	[126, 3, "eggplant-aubergine.png", 126, "ABE"],
	[127, 3, "thermos-flask.png", 127, "ABE"],
	[128, 3, "vaccuum-hoover.png", 128, "ABE"],
	[129, 3, "television-telly.png", 129, "ABE"],
	[130, 3, "mixer.png", 130, "FIL"],
	[131, 3, "shoes-sneakers-trainers.png", 131, "SYN"],
	[132, 3, "ashtray.png", 132, "FIL"],
	[133, 3, "cupboard-wardrobe.png", 133, "SYN"],
	[134, 3, "cappuccino-coffee.png", 134, "SYN"],
	[135, 3, "globe.png", 135, "FIL"],
	[136, 3, "rooster-cock.png", 136, "SYN"],
	[137, 3, "car-minivan.png", 137, "SYN"],
	[138, 3, "car-automobile.png", 138, "SYN"],
	[139, 3, "cup-mug.png", 139, "SYN"],
	[140, 3, "book.png", 140, "FIL"],
	[141, 3, "sandals-shoes.png", 141, "SYN"],
	[142, 3, "cellphone-mobilephone.png", 142, "ABE"],
	[143, 3, "egg.png", 143, "FIL"],
	[144, 3, "cap-hat.png", 144, "SYN"],
	[145, 3, "cookie-biscuit.png", 145, "ABE"],
	[146, 3, "horse-pony.png", 146, "SYN"]
];

var stimuli_production_2 = [
	[0, 0, "hammer.png", 0, "PRC"],
	[0, 0, "fork.png", 0, "PRC"],
	[0, 0, "handheldfan.png", 0, "PRC"],
	[1, 1, "horse-pony.png", 146],
	[2, 1, "cookie-biscuit.png", 145],
	[3, 1, "cap-hat.png", 144],
	[4, 1, "egg.png", 143],
	[5, 1, "cellphone-mobilephone.png", 142],
	[6, 1, "sandals-shoes.png", 141],
	[7, 1, "book.png", 140],
	[8, 1, "cup-mug.png", 139],
	[9, 1, "car-automobile.png", 138],
	[10, 1, "car-minivan.png", 137],
	[11, 1, "rooster-cock.png", 136],
	[12, 1, "globe.png", 135],
	[13, 1, "cappuccino-coffee.png", 134],
	[14, 1, "cupboard-wardrobe.png", 133],
	[15, 1, "ashtray.png", 132],
	[16, 1, "shoes-sneakers-trainers.png", 131],
	[17, 1, "mixer.png", 130],
	[18, 1, "television-telly.png", 129],
	[19, 1, "vaccuum-hoover.png", 128],
	[20, 1, "thermos-flask.png", 127],
	[21, 1, "eggplant-aubergine.png", 126],
	[22, 1, "eraser-rubber.png", 125],
	[23, 1, "baguette-bread.png", 124],
	[24, 1, "whistle.png", 123],
	[25, 1, "pencil.png", 122],
	[26, 1, "feather-plume.png", 121],
	[27, 1, "candy-sweets.png", 120],
	[28, 1, "sweater-jumper.png", 119],
	[29, 1, "rose-flower.png", 118],
	[30, 1, "rabbit-bunny.png", 117],
	[31, 1, "battery.png", 116],
	[32, 1, "pineapple.png", 115],
	[33, 1, "bike-bicycle.png", 114],
	[34, 1, "fries-chips.png", 113],
	[35, 1, "lamp.png", 112],
	[36, 1, "buffalo-bison.png", 111],
	[37, 1, "saxophone.png", 110],
	[38, 1, "backpack-rucksack.png", 109],
	[39, 1, "monkey-chimp.png", 108],
	[40, 1, "bed.png", 107],
	[41, 1, "sheep-lamb.png", 106],
	[42, 1, "jar-jug.png", 105],
	[43, 1, "store-shop.png", 104],
	[44, 1, "licenseplate-numberplate.png", 103],
	[45, 1, "key.png", 102],
	[46, 1, "zucchini-courgette.png", 101],
	[47, 1, "shirt-blouse.png", 100],
	[48, 1, "pillow.png", 99],
	[49, 1, "clock.png", 98],
	[50, 1, "flash-torch.png", 97],
	[51, 2, "dog-beagle.png", 96],
	[52, 2, "carpet-rug.png", 95],
	[53, 2, "lemon.png", 94],
	[54, 2, "banana.png", 93],
	[55, 2, "jacket-coat.png", 92],
	[56, 2, "espresso-coffee.png", 91],
	[57, 2, "ladybird-ladybug.png", 90],
	[58, 2, "lilly-flower.png", 89],
	[59, 2, "beetle-bug.png", 88],
	[60, 2, "taxi-cab.png", 87],
	[61, 2, "apron.png", 86],
	[62, 2, "razor.png", 85],
	[63, 2, "belt.png", 84],
	[64, 2, "shrimp-prawn.png", 83],
	[65, 2, "barrel-keg.png", 82],
	[66, 2, "chicken-hen.png", 81],
	[67, 2, "scissors.png", 80],
	[68, 2, "costume-fancydress.png", 79],
	[69, 2, "parrot-bird.png", 78],
	[70, 2, "pants-trousers.png", 77],
	[71, 2, "pigeon-dove.png", 76],
	[72, 2, "garden-yard.png", 75],
	[73, 2, "iron.png", 74],
	[74, 2, "cake.png", 73],
	[75, 2, "lock.png", 72],
	[76, 2, "sword-dagger.png", 71],
	[77, 2, "bandaid-plaster.png", 70],
	[78, 2, "zipper-zip.png", 69],
	[79, 2, "boots-shoes.png", 68],
	[80, 2, "boat-ship.png", 67],
	[81, 2, "fishsticks-fishfingers.png", 66],
	[82, 2, "scarf.png", 65],
	[83, 2, "elevator-lift.png", 64],
	[84, 2, "fork.png", 63],
	[85, 2, "balloon.png", 62],
	[86, 2, "spoon.png", 61],
	[87, 2, "wheat-grain.png", 60],
	[88, 2, "car-convertible.png", 59],
	[89, 2, "cake-pie.png", 58],
	[90, 2, "shovel-spade.png", 57],
	[91, 2, "suitcase.png", 56],
	[92, 2, "glasses-spectacles.png", 55],
	[93, 2, "doll.png", 54],
	[94, 2, "chair.png", 53],
	[95, 2, "sled-sledge.png", 52],
	[96, 2, "basket.png", 51],
	[97, 2, "bag-sack.png", 50],
	[98, 2, "juice-drink.png", 49],
	[99, 2, "cocktail-drink.png", 48],
	[100, 3, "dress-gown.png", 47],
	[101, 3, "trumpet.png", 46],
	[102, 3, "lipstick.png", 45],
	[103, 3, "fish-salmon.png", 44],
	[104, 3, "plane-aeroplane.png", 43],
	[105, 3, "dog-poodle.png", 42],
	[106, 3, "turtle-tortoise.png", 41],
	[107, 3, "barbecue.png", 40],
	[108, 3, "bench.png", 39],
	[109, 3, "axe-hatchet.png", 38],
	[110, 3, "couch-sofa.png", 37],
	[111, 3, "monkey-ape.png", 36],
	[112, 3, "arrow.png", 35],
	[113, 3, "cart-trolley.png", 34],
	[114, 3, "truck-lorry.png", 33],
	[115, 3, "bird-sparrow.png", 32],
	[116, 3, "skirt.png", 31],
	[117, 3, "crib-cot.png", 30],
	[118, 3, "pear.png", 29],
	[119, 3, "chips-crisps.png", 28],
	[120, 3, "violin-fiddle.png", 27],
	[121, 3, "house-mansion.png", 26],
	[122, 3, "veranda-porch.png", 25],
	[123, 3, "fridge-refrigerator.png", 24],
	[124, 3, "pizza.png", 23],
	[125, 3, "gun-pistol.png", 22],
	[126, 3, "bus-coach.png", 21],
	[127, 3, "vest-waistcoat.png", 20],
	[128, 3, "cheese.png", 19],
	[129, 3, "mailbox-postbox.png", 18],
	[130, 3, "frog-toad.png", 17],
	[131, 3, "snake-serpent.png", 16],
	[132, 3, "stone-rock.png", 15],
	[133, 3, "bottle.png", 14],
	[134, 3, "can-tin.png", 13],
	[135, 3, "fan.png", 12],
	[136, 3, "stove-cooker.png", 11],
	[137, 3, "umbrella.png", 10],
	[138, 3, "diaper-nappy.png", 9],
	[139, 3, "faucet-tap.png", 8],
	[140, 3, "bird-canary.png", 7],
	[141, 3, "tomato.png", 6],
	[142, 3, "guitar.png", 5],
	[143, 3, "carrot.png", 4],
	[144, 3, "candle.png", 3],
	[145, 3, "hammer.png", 2],
	[146, 3, "trashcan-bin.png", 1]
];

// flip a coin whether or not we invert the stimulus order (so, 50:50 for participants)
// critically, we do this once only (else, if a participant reopens the experiment, they might get yet another roll)
var roll = typeof(localStorage.getItem('pilot_roll_production')) === undefined || localStorage.getItem('pilot_roll_production') === null ? Math.random() : localStorage.getItem('pilot_roll_production');
localStorage.setItem('pilot_roll_production', roll);
let stimuli_production = roll <= 0.5 ? stimuli_production_1 : stimuli_production_2;

// pseudorandomised list of reception stimuli
// [order, block, picture, proposed name, type, id]
var stimuli_reception_1 = [
	[1, 1, "gun-pistol.png", "pistol", "SYN", 1],
	[2, 1, "baguette-bread.png", "bread", "SYN", 2],
	[3, 1, "sled-sledge.png", "sledge", "ABE", 3],
	[4, 1, "bird-canary.png", "canary", "SYN", 4],
	[5, 1, "thermos-flask.png", "flask", "ABE", 5],
	[6, 1, "mailbox-postbox.png", "postbox", "ABE", 6],
	[7, 1, "stone-rock.png", "rock", "SYN", 7],
	[8, 1, "rose-flower.png", "flower", "SYN", 8],
	[9, 1, "carpet-rug.png", "rug", "SYN", 9],
	[10, 1, "bottle.png", "glass", "FIL", 10],
	[11, 1, "candy-sweets.png", "sweets", "ABE", 11],
	[12, 1, "rooster-cock.png", "cock", "SYN", 12],
	[13, 1, "car-automobile.png", "automobile", "SYN", 13],
	[14, 1, "cookie-biscuit.png", "biscuit", "ABE", 14],
	[15, 1, "sheep-lamb.png", "lamb", "SYN", 15],
	[16, 1, "cake-pie.png", "pie", "SYN", 16],
	[17, 1, "rabbit-bunny.png", "bunny", "SYN", 17],
	[18, 1, "glasses-spectacles.png", "spectacles", "SYN", 18],
	[19, 1, "cappuccino-coffee.png", "coffee", "SYN", 19],
	[20, 1, "lemon.png", "lime", "FIL", 20],
	[21, 1, "horse-pony.png", "pony", "SYN", 21],
	[22, 1, "cart-trolley.png", "trolly", "ABE", 22],
	[23, 1, "wheat-grain.png", "grain", "SYN", 23],
	[24, 1, "garden-yard.png", "garden", "ABE", 24],
	[25, 1, "axe-hatchet.png", "hatchet", "SYN", 25],
	[26, 1, "monkey-ape.png", "ape", "SYN", 26],
	[27, 1, "cupboard-wardrobe.png", "wardrobe", "SYN", 27],
	[28, 1, "eraser-rubber.png", "rubber", "ABE", 28],
	[29, 1, "television-telly.png", "telly", "ABE", 29],
	[30, 1, "balloon.png", "ball", "FIL", 30],
	[31, 1, "cup-mug.png", "mug", "SYN", 31],
	[32, 1, "flash-torch.png", "torch", "ABE", 32],
	[33, 1, "shrimp-prawn.png", "prawn", "ABE", 33],
	[34, 1, "turtle-tortoise.png", "tortoise", "SYN", 34],
	[35, 1, "fishsticks-fishfingers.png", "fish finger", "ABE", 35],
	[36, 1, "clock.png", "watch", "FIL", 36],
	[37, 1, "car-convertible.png", "convertible", "SYN", 37],
	[38, 1, "diaper-nappy.png", "nappy", "ABE", 38],
	[39, 1, "chicken-hen.png", "hen", "SYN", 39],
	[40, 1, "eggplant-aubergine.png", "aubergine", "ABE", 40],
	[41, 1, "cocktail-drink.png", "drink", "SYN", 41],
	[42, 1, "violin-fiddle.png", "fiddle", "SYN", 42],
	[43, 1, "pigeon-dove.png", "dove", "SYN", 43],
	[44, 1, "snake-serpent.png", "serpent", "SYN", 44],
	[45, 1, "taxi-cab.png", "cab", "SYN", 45],
	[46, 1, "costume-fancydress.png", "fancy dress", "ABE", 46],
	[47, 1, "espresso-coffee.png", "coffee", "SYN", 47],
	[48, 1, "veranda-porch.png", "veranda", "SYN", 48],
	[49, 1, "doll.png", "puppet", "FIL", 49],
	[50, 1, "frog-toad.png", "toad", "SYN", 50],
	[51, 1, "can-tin.png", "tin", "ABE", 51],
	[52, 2, "parrot-bird.png", "bird", "SYN", 52],
	[53, 2, "trashcan-bin.png", "dustbin", "ABE", 53],
	[54, 2, "juice-drink.png", "drink", "SYN", 54],
	[55, 2, "dog-poodle.png", "poodle", "SYN", 55],
	[56, 2, "plane-aeroplane.png", "aeroplane", "ABE", 56],
	[57, 2, "boat-ship.png", "ship", "SYN", 57],
	[58, 2, "vest-waistcoat.png", "waistcoat", "ABE", 58],
	[59, 2, "bird-sparrow.png", "sparrow", "SYN", 59],
	[60, 2, "house-mansion.png", "mansion", "SYN", 60],
	[61, 2, "vaccuum-hoover.png", "hoover", "ABE", 61],
	[62, 2, "whistle.png", "bell", "FIL", 62],
	[63, 2, "shoes-sneakers-trainers.png", "sneakers", "SYN", 63],
	[64, 2, "sandals-shoes.png", "shoes", "SYN", 64],
	[65, 2, "monkey-chimp.png", "chimpanzee", "SYN", 65],
	[66, 2, "stove-cooker.png", "cooker", "ABE", 66],
	[67, 2, "lilly-flower.png", "lilly", "SYN", 67],
	[68, 2, "bandaid-plaster.png", "plaster", "ABE", 68],
	[69, 2, "crib-cot.png", "cot", "ABE", 69],
	[70, 2, "faucet-tap.png", "tap", "ABE", 70],
	[71, 2, "pants-trousers.png", "trousers", "ABE", 71],
	[72, 2, "car-minivan.png", "minivan", "SYN", 72],
	[73, 2, "hammer.png", "saw", "FIL", 73],
	[74, 2, "elevator-lift.png", "lift", "ABE", 74],
	[75, 2, "cellphone-mobilephone.png", "mobile phone", "ABE", 75],
	[76, 2, "dog-beagle.png", "beagle", "SYN", 76],
	[77, 2, "sweater-jumper.png", "jumper", "ABE", 77],
	[78, 2, "chips-crisps.png", "crisps", "ABE", 78],
	[79, 2, "store-shop.png", "store", "SYN", 79],
	[80, 2, "backpack-rucksack.png", "rucksack", "ABE", 80],
	[81, 2, "feather-plume.png", "plume", "SYN", 81],
	[82, 2, "couch-sofa.png", "sofa", "SYN", 82],
	[83, 2, "boots-shoes.png", "boots", "SYN", 83],
	[84, 2, "bus-coach.png", "coach", "SYN", 84],
	[85, 2, "shirt-blouse.png", "blouse", "SYN", 85],
	[86, 2, "egg.png", "edge", "FIL", 86],
	[87, 2, "dress-gown.png", "gown", "SYN", 87],
	[88, 2, "cap-hat.png", "hat", "SYN", 88],
	[89, 2, "jacket-coat.png", "coat", "SYN", 89],
	[90, 2, "shovel-spade.png", "spade", "SYN", 90],
	[91, 2, "bike-bicycle", "bicycle", "SYN", 91],
	[92, 2, "buffalo-bison.png", "bison", "SYN", 92],
	[93, 2, "licenseplate-numberplate.png", "number plate", "ABE", 93],
	[94, 2, "book.png", "bullet", "FIL", 94],
	[95, 2, "fish-salmon.png", "salmon", "SYN", 95],
	[96, 2, "ladybird-ladybug.png", "ladybird", "ABE", 96],
	[97, 2, "bag-sack.png", "sack", "SYN", 97],
	[98, 2, "fridge-refrigerator.png", "refrigerator", "SYN", 98],
	[99, 2, "zipper-zip.png", "zip", "ABE", 99],
	[100, 2, "truck-lorry.png", "lorry", "ABE", 100],
	[101, 2, "sword-dagger.png", "dagger", "SYN", 101],
	[102, 2, "zucchini-courgette.png", "courgette", "ABE", 102],
	[103, 2, "fries-chips.png", "chips", "ABE", 103],
	[104, 2, "sweater-jumper.png", "sweater", "SYN", 104],
	[105, 2, "fan.png", "ventilator", "SYN", 105],
	[106, 2, "shoes-sneakers-trainers.png", "trainers", "ABE", 106]
];

var stimuli_reception_2 = [
	[1, 1, "shoes-sneakers-trainers.png", "trainers", "ABE", 106],
	[2, 1, "fan.png", "ventilator", "SYN", 105],
	[3, 1, "sweater-jumper.png", "sweater", "SYN", 104],
	[4, 1, "fries-chips.png", "chips", "ABE", 103],
	[5, 1, "zucchini-courgette.png", "courgette", "ABE", 102],
	[6, 1, "sword-dagger.png", "dagger", "SYN", 101],
	[7, 1, "truck-lorry.png", "lorry", "ABE", 100],
	[8, 1, "zipper-zip.png", "zip", "ABE", 99],
	[9, 1, "fridge-refrigerator.png", "refrigerator", "SYN", 98],
	[10, 1, "bag-sack.png", "sack", "SYN", 97],
	[11, 1, "ladybird-ladybug.png", "ladybird", "ABE", 96],
	[12, 1, "fish-salmon.png", "salmon", "SYN", 95],
	[13, 1, "book.png", "bullet", "FIL", 94],
	[14, 1, "licenseplate-numberplate.png", "number plate", "ABE", 93],
	[15, 1, "buffalo-bison.png", "bison", "SYN", 92],
	[16, 1, "bike-bicycle", "bicycle", "SYN", 91],
	[17, 1, "shovel-spade.png", "spade", "SYN", 90],
	[18, 1, "jacket-coat.png", "coat", "SYN", 89],
	[19, 1, "cap-hat.png", "hat", "SYN", 88],
	[20, 1, "dress-gown.png", "gown", "SYN", 87],
	[21, 1, "egg.png", "edge", "FIL", 86],
	[22, 1, "shirt-blouse.png", "blouse", "SYN", 85],
	[23, 1, "bus-coach.png", "coach", "SYN", 84],
	[24, 1, "boots-shoes.png", "boots", "SYN", 83],
	[25, 1, "couch-sofa.png", "sofa", "SYN", 82],
	[26, 1, "feather-plume.png", "plume", "SYN", 81],
	[27, 1, "backpack-rucksack.png", "rucksack", "ABE", 80],
	[28, 1, "store-shop.png", "store", "SYN", 79],
	[29, 1, "chips-crisps.png", "crisps", "ABE", 78],
	[30, 1, "sweater-jumper.png", "jumper", "ABE", 77],
	[31, 1, "dog-beagle.png", "beagle", "SYN", 76],
	[32, 1, "cellphone-mobilephone.png", "mobile phone", "ABE", 75],
	[33, 1, "elevator-lift.png", "lift", "ABE", 74],
	[34, 1, "hammer.png", "saw", "FIL", 73],
	[35, 1, "car-minivan.png", "minivan", "SYN", 72],
	[36, 1, "pants-trousers.png", "trousers", "ABE", 71],
	[37, 1, "faucet-tap.png", "tap", "ABE", 70],
	[38, 1, "crib-cot.png", "cot", "ABE", 69],
	[39, 1, "bandaid-plaster.png", "plaster", "ABE", 68],
	[40, 1, "lilly-flower.png", "lilly", "SYN", 67],
	[41, 1, "stove-cooker.png", "cooker", "ABE", 66],
	[42, 1, "monkey-chimp.png", "chimpanzee", "SYN", 65],
	[43, 1, "sandals-shoes.png", "shoes", "SYN", 64],
	[44, 1, "shoes-sneakers-trainers.png", "sneakers", "SYN", 63],
	[45, 1, "whistle.png", "bell", "FIL", 62],
	[46, 1, "vaccuum-hoover.png", "hoover", "ABE", 61],
	[47, 1, "house-mansion.png", "mansion", "SYN", 60],
	[48, 1, "bird-sparrow.png", "sparrow", "SYN", 59],
	[49, 1, "vest-waistcoat.png", "waistcoat", "ABE", 58],
	[50, 1, "boat-ship.png", "ship", "SYN", 57],
	[51, 1, "plane-aeroplane.png", "aeroplane", "ABE", 56],
	[52, 1, "dog-poodle.png", "poodle", "SYN", 55],
	[53, 1, "juice-drink.png", "drink", "SYN", 54],
	[54, 1, "trashcan-bin.png", "dustbin", "ABE", 53],
	[55, 2, "parrot-bird.png", "bird", "SYN", 52],
	[56, 2, "can-tin.png", "tin", "ABE", 51],
	[57, 2, "frog-toad.png", "toad", "SYN", 50],
	[58, 2, "doll.png", "puppet", "FIL", 49],
	[59, 2, "veranda-porch.png", "veranda", "SYN", 48],
	[60, 2, "espresso-coffee.png", "coffee", "SYN", 47],
	[61, 2, "costume-fancydress.png", "fancy dress", "ABE", 46],
	[62, 2, "taxi-cab.png", "cab", "SYN", 45],
	[63, 2, "snake-serpent.png", "serpent", "SYN", 44],
	[64, 2, "pigeon-dove.png", "dove", "SYN", 43],
	[65, 2, "violin-fiddle.png", "fiddle", "SYN", 42],
	[66, 2, "cocktail-drink.png", "drink", "SYN", 41],
	[67, 2, "eggplant-aubergine.png", "aubergine", "ABE", 40],
	[68, 2, "chicken-hen.png", "hen", "SYN", 39],
	[69, 2, "diaper-nappy.png", "nappy", "ABE", 38],
	[70, 2, "car-convertible.png", "convertible", "SYN", 37],
	[71, 2, "clock.png", "watch", "FIL", 36],
	[72, 2, "fishsticks-fishfingers.png", "fish finger", "ABE", 35],
	[73, 2, "turtle-tortoise.png", "tortoise", "SYN", 34],
	[74, 2, "shrimp-prawn.png", "prawn", "ABE", 33],
	[75, 2, "flash-torch.png", "torch", "ABE", 32],
	[76, 2, "cup-mug.png", "mug", "SYN", 31],
	[77, 2, "balloon.png", "ball", "FIL", 30],
	[78, 2, "television-telly.png", "telly", "ABE", 29],
	[79, 2, "eraser-rubber.png", "rubber", "ABE", 28],
	[80, 2, "cupboard-wardrobe.png", "wardrobe", "SYN", 27],
	[81, 2, "monkey-ape.png", "ape", "SYN", 26],
	[82, 2, "axe-hatchet.png", "hatchet", "SYN", 25],
	[83, 2, "garden-yard.png", "garden", "ABE", 24],
	[84, 2, "wheat-grain.png", "grain", "SYN", 23],
	[85, 2, "cart-trolley.png", "trolly", "ABE", 22],
	[86, 2, "horse-pony.png", "pony", "SYN", 21],
	[87, 2, "lemon.png", "lime", "FIL", 20],
	[88, 2, "cappuccino-coffee.png", "coffee", "SYN", 19],
	[89, 2, "glasses-spectacles.png", "spectacles", "SYN", 18],
	[90, 2, "rabbit-bunny.png", "bunny", "SYN", 17],
	[91, 2, "cake-pie.png", "pie", "SYN", 16],
	[92, 2, "sheep-lamb.png", "lamb", "SYN", 15],
	[93, 2, "cookie-biscuit.png", "biscuit", "ABE", 14],
	[94, 2, "car-automobile.png", "automobile", "SYN", 13],
	[95, 2, "rooster-cock.png", "cock", "SYN", 12],
	[96, 2, "candy-sweets.png", "sweets", "ABE", 11],
	[97, 2, "bottle.png", "glass", "FIL", 10],
	[98, 2, "carpet-rug.png", "rug", "SYN", 9],
	[99, 2, "rose-flower.png", "flower", "SYN", 8],
	[100, 2, "stone-rock.png", "rock", "SYN", 7],
	[101, 2, "mailbox-postbox.png", "postbox", "ABE", 6],
	[102, 2, "thermos-flask.png", "flask", "ABE", 5],
	[103, 2, "bird-canary.png", "canary", "SYN", 4],
	[104, 2, "sled-sledge.png", "sledge", "ABE", 3],
	[105, 2, "baguette-bread.png", "bread", "SYN", 2],
	[106, 2, "gun-pistol.png", "pistol", "SYN", 1]
];

// flip a coin whether or not we invert the stimulus order (so, 50:50 for participants)
// critically, we do this once only (else, if a participant reopens the experiment, they might get yet another roll)
var rroll = typeof(localStorage.getItem('pilot_roll_reception')) === undefined || localStorage.getItem('pilot_roll_reception') === null ? Math.random() : localStorage.getItem('pilot_roll_reception');
localStorage.setItem('pilot_roll_reception', rroll);
let stimuli_reception = rroll <= 0.5 ? stimuli_reception_1 : stimuli_reception_2;
