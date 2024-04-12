const axios = require("axios");
const {
  SCRAPE_API_BASE_URL,
  SCRAPE_API_CATEGORY_LIST,
  COLOR_LIST,
  MATERIAL_LIST,
  SIZE_LIST,
} = require("../constants");
const {
  getRandomArrayIndex,
  initialBrandsCount,
  fetchScrapeAPIResource,
} = require("../utils");

const fetchProducts = async () => {
  let products = [];

  for (let category of SCRAPE_API_CATEGORY_LIST) {
    const responseProducts = await fetchScrapeAPIResource(
      `/products/category/${category}`, "products"
    );

    products = [...products, ...responseProducts];
  }

  return products;
};

exports.cleanupProducts = async () => {
  const products = await fetchProducts();
  const obj_brandsCount = initialBrandsCount();

  const cleanProdcts = products.map((product, index) => {
    const randomMaterial = MATERIAL_LIST[getRandomArrayIndex(MATERIAL_LIST)];

    const randomColor = COLOR_LIST[getRandomArrayIndex(COLOR_LIST)];

    const randomSize = SIZE_LIST[getRandomArrayIndex(SIZE_LIST)];

    // Recursive function to get a random key from an object
    const getBrandId = () => {
      const random_key_brandId =
        Object.keys(obj_brandsCount)[
          getRandomArrayIndex(Object.keys(obj_brandsCount))
        ];

      if (obj_brandsCount[random_key_brandId] >= 4) {
        return getBrandId(); // Recursive case
      }

      obj_brandsCount[random_key_brandId] += 1;
      return random_key_brandId; // Base case
    };

    const brand_id = getBrandId();

    return {
      id: index + 1,
      brand_id: brand_id,
      name: product.title,
      description: product.description,
      category: product.category,
      material: randomMaterial,
      price: product.price,
      currency: "USD",
      image_url: product.thumbnail,
      colors: randomColor,
      sizes: randomSize,
    };
  });

  return cleanProdcts;
};

// exports.productsnewData = [
//   {
//     id: 1,
//     brand_id: 1,
//     name: "The Organic Cotton Muscle Tee",
//     description:
//       "The Organic Cotton Muscle Tee features a delicate rib-trim crewneck, double layer cap sleeves and exaggerated shoulders.",
//     category: "T-Shirt",
//     material: "Organic Cotton",
//     price: 49.0,
//     currency: "USD",
//     image_url:
//       "https://media.everlane.com/images/c_fill,w_384,ar_4:5,q_auto,dpr_1.0,f_auto,fl_progressive:steep/i/0d1029f1_19dc/womens-organic-cotton-muscle-tee-white",
//     colors: "Black, White, Heather Grey,Bone/Black",
//     sizes: "XXS, XS, S, M, L, XL, XXL",
//   },
//   {
//     id: 2,
//     brand_id: 1,
//     name: "The Linen Oversized Puff-Sleeve Dress",
//     description:
//       "This piece features an A-line midi silhouette, oversized fit, V-neckline, gathered shoulders, sleeves, and waist in airy linen.",
//     category: "Dress",
//     material: "European Flax Linen",
//     price: 220.0,
//     currency: "USD",
//     image_url:
//       "https://www.everlane.com/products/womens-linen-oversized-puff-sleeve-dress-bone-black-check?collection=womens-linen-clothing",
//     colors: "Black, Bone, Bone/Black Check",
//     sizes: "XXS, XS, S, M, L, XL, XXL",
//   },
//   {
//     id: 3,
//     brand_id: 2,
//     name: "Joy One Piece Swimsuit",
//     description:
//       "This is a lightweight stretchy fabric - 78% ECONYL® Regenerated Nylon, 22% elastane.This is made with synthetic materials and may shed microplastics.",
//     category: "Swimsuit",
//     material: "Regenerated Nylon elastane",
//     price: 218.0,
//     currency: "USD",
//     image_url:
//       "https://www.thereformation.com/products/joy-one-piece-swimsuit/1315150SYK.html?dwvar_1315150SYK_color=SYK&quantity=1",
//     colors: "Shell, Sky",
//     sizes: "XS, S, M, L, XL",
//   },
//   {
//     id: 4,
//     brand_id: 2,
//     name: "Paddle One Piece Swimsuit",
//     description:
//       "This is made with synthetic materials and may shed microplastics",
//     category: "Swimsuit",
//     material: "Organic Cotton and Spandex",
//     price: "248.00",
//     currency: "USD",
//     image_url:
//       "https://www.thereformation.com/products/paddle-one-piece-swimsuit/1315129OLV.html?dwvar_1315129OLV_color=OLV",
//     colors: "Olive, Black",
//     sizes: "XS, S, M, L, XL",
//   },
//   {
//     id: 5,
//     brand_id: 3,
//     name: "Men's Torrentshell 3L Rain Jacket",
//     description:
//       "Two-way-adjustable hood with a laminated visor rolls down and stows with a simplified cord-and-hook design.Microfleece-lined neck provides comfort and protects with a waterproof/breathable barrier.Snag-free center-front zipper with external and internal storm flaps, and a zipper garage protects the chin.",
//     category: "Jacket",
//     material: "Recycled Waterproof/ Breathable Face Fabric",
//     price: 134.99,
//     currency: "USD",
//     image_url:
//       "https://www.patagonia.ca/product/mens-torrentshell-3l-rain-jacket/195699381575.html",
//     colors:
//       "Subtidal Blue, Nouveau Green, Smolder Blue, Black, Endless Blue, Buckhorn Green, Golden Caramel, Phosphorous Green, Wax Red",
//     sizes: "XS, S, M, L, XL, XXL, 3XL",
//   },
//   {
//     id: 6,
//     brand_id: 3,
//     name: "Women's Tropic Comfort Natural UPF Hoody",
//     description:
//       "An insulated, water-resistant jacket for women. Made from 100% recycled materials and ideal for chilly days.",
//     category: "Hoodie",
//     material: "Recycled Polyester",
//     price: 125.0,
//     currency: "USD",
//     image_url:
//       "https://www.patagonia.ca/product/womens-tropic-comfort-natural-sun-upf-hoody/41935.html?dwvar_41935_color=STME&cgid=sport-fly-fishing-womens",
//     colors: "Steam Blue, Journeys:Natural, Antique Pink, Wispy Green",
//     sizes: "XS, S, M, L, XL",
//   },
//   {
//     id: 7,
//     brand_id: 4,
//     name: "Sexy Robot Oversized Organic Cotton T-Shirt",
//     description:
//       "Crafted from pure cotton jersey, shaped to a boxy silhouette with dropped shoulders and short sleeves, this tee is printed with a head-turning ‘Sexy Robot’ graphic across the front – an iconic signature of the Japanese artists.",
//     category: "T-Shirt",
//     material: "Organic Cotton",
//     price: 465.0,
//     currency: "GBP",
//     image_url:
//       "https://www.stellamccartney.com/ca/en/unisex/stella-mccartney-sorayama/sexy-robot-oversized-organic-cotton-t-shirt-6J01583SPY759000.html",
//     colors: "Pure White",
//     sizes: "XXS, XS, S, M, L, XL",
//   },
//   {
//     id: 8,
//     brand_id: 4,
//     name: "Platinum Dream Embroidered Oversized Denim Shirt",
//     description:
//       "This Stella McCartney + Sorayama staple is elevated with contrast stitching and ‘Platinum Dream’ embroidery across the front. Pair them with the limited-edition collaboration’s coordinating jeans.",
//     category: "Denim Shirt",
//     material: "Organic Cotton",
//     price: 1585.0,
//     currency: "GBP",
//     image_url:
//       "https://www.stellamccartney.com/ca/en/unisex/stella-mccartney-sorayama/platinum-dream-embroidered-oversized-denim-shirt-6D02643SPH664003.html",
//     colors: "Dark Blue",
//     sizes: "XXS, XS, S, M, L, XL",
//   },
//   {
//     id: 9,
//     brand_id: 5,
//     name: "Leora Wrap Dress",
//     description:
//       "Our Leora Wrap Dress is a true wrap dress with waist tie for your choice of fit, and is made from a stunning red Fairtrade and GOTS certified organic cotton jersey for a real pop of colour under the summer",
//     category: "Dress",
//     material: "Organic Cotton",
//     price: 109.0,
//     currency: "EUR",
//     image_url:
//       "https://peopletree.eu/cdn/shop/products/People_Tree_Leora_Wrap_Dress_in_Blue_1_720x.jpg?v=1682082859",
//     colors: "Blue, Black, Red",
//     sizes: "8, 10, 12, 14, 16",
//   },
//   {
//     id: 10,
//     brand_id: 5,
//     name: "Bessie Striped Dress",
//     description:
//       "The dress itself is an effortlessly stylish straight-cut shirtdress, with a midi length, coconut button front and tie belt to cinch you in at the waist.Short drop shoulder sleeves make Bessie ideal for warm days, and side splits keep the dress as practical as it is flattering.And in case you were wondering then, yes, our Bessie Dress has pockets!",
//     category: "Dress",
//     material: "Organic Cotton",
//     price: 169.0,
//     currency: "EUR",
//     image_url:
//       "https://peopletree.eu/products/bessie-striped-dress-in-blue-stripe?variant=46524636496195",
//     colors: "Blue Stripe",
//     sizes: "8, 10, 12, 14, 16",
//   },
//   {
//     id: 11,
//     brand_id: 6,
//     name: "Organic Linen Lantern Pant",
//     description:
//       "Subtly curved through the leg, slightly tapered at the ankle. Fits the body with ease.1 1/2-inch elastic waistband, 1-inch-deep front pleats.Side panel detail, on-seam pockets.",
//     category: "Pants",
//     material: "Organic Linen",
//     price: 420.11,
//     currency: "USD",
//     image_url:
//       "https://www.eileenfisher.com/organic-linen-lantern-pant/S4RII-P4794-WHITE.html?loc=CA&dwvar_S4RII-P4794-WHITE_color=100",
//     colors: "Black, White, Flame, Undyed natural",
//     sizes: "PP, PS, PM, PL, S, M, L, XL, XS, XXS, 1X, 2X, 3X",
//   },
//   {
//     id: 12,
//     brand_id: 6,
//     name: "Crushed Silk Tiered",
//     description:
//       "A chic jumpsuit made from Tencel lyocell. Features a relaxed fit and adjustable waist tie.",
//     category: "Dress",
//     material: "Silk",
//     price: 571.23,
//     currency: "USD",
//     image_url:
//       "https://www.eileenfisher.com/crushed-silk-tiered-dress/S4TZH-D4983.html?loc=CA&dwvar_S4TZH-D4983_color=675",
//     colors: "Black, Geranium, Flame, Steel, Atlantis",
//     sizes: "PP,PS, PM, PL, S, M, L, XL, XS, XXS, 1X, 2X, 3X",
//   },
//   {
//     id: 13,
//     brand_id: 7,
//     name: "Regenerative Cotton Crop Lines T-Shirt",
//     description:
//       "Organic Cotton Regeneratively Grown Crew Neck Graphic Shortsleeve T-Shirt",
//     category: "T-Shirt",
//     material: "Organic Cotton",
//     price: 40.0,
//     currency: "CAD",
//     image_url:
//       "https://www.tentree.com/products/regenerative-cotton-crop-lines-t-shirt-undyed-midnight-blue",
//     colors:
//       "Undyed Midnight Blue, Meteorite Black Sugar Pine, Mesa Red Sugar Pine",
//     sizes: "S, M, L, XL, XXL",
//   },
//   {
//     id: 14,
//     brand_id: 7,
//     name: "InMotion Sleeveless Jumpsuit",
//     description:
//       "Sleeveless,Covered front button placket,Mandarine collar,Hand pockets, Back pockets, Chest patch pockets, Elastic at back waist",
//     category: "Dress",
//     material: "Recycled Polyester and Elastane",
//     price: 118.0,
//     currency: "CAD",
//     image_url:
//       "https://www.tentree.com/products/inmotion-sleeveless-jumpsuit-meteorite-black",
//     colors: "Meteorite Black",
//     sizes: "S, M, L, XL, XS",
//   },
//   {
//     id: 15,
//     brand_id: 8,
//     name: "Stretch French Terry Zip Hoodie",
//     description:
//       "Your sweats game just got an upgrade. Made with a premium french terry fabric, this Zip Hoodie is modern, sleek, and polished - while still feeling crazy comfortable.Super-comfortable lightweight, yet durable, French Terry fabric. Raglan sleeve for added comfortUnique patch pockets keep your belongings secure",
//     category: "Jacket",
//     material: "Organic Cotton and Elastane",
//     price: 110.0,
//     currency: "USD",
//     image_url:
//       "https://wearpact.com/men/apparel/all%20tops/stretch%20french%20terry%20zip%20hoodie/wa1-mfh-mgt",
//     colors:
//       "Black, Charcoal Heather, Blue Dusk, French Navy Heather, French Navy, Ivy, Medium Grey Heather",
//     sizes: "S, M, L, XL",
//   },
//   {
//     id: 16,
//     brand_id: 8,
//     name: "Coastal Double Gauze Ruffle Maxi Dress",
//     description:
//       "Woven, double-gauze fabric creates a flowy silhouette,V-neck with gathered ruffle neckline,Sleeveless,Tiered, full sweep skirt,Hidden side pockets,Ankle length on most",
//     category: "Dress",
//     material: "Organic Cotton",
//     price: 165.0,
//     currency: "USD",
//     image_url:
//       "https://wearpact.com/women/apparel/all%20dresses%20&%20jumpsuits/coastal%20double%20gauze%20ruffle%20maxi%20dress/wa1-wkm-blk",
//     colors: "Black, Dark Forest, East Coast Stripe, French Navy, Maroon",
//     sizes: "S, M, L, XL, XS, 2XL, 3XL",
//   },
//   {
//     id: 17,
//     brand_id: 9,
//     name: "Milou Organic Cotton Corduroy Shirt",
//     description:
//       "Babycord shirt, High neck with delicate frill, Relaxed fit, Decorative pintuck detailing at the front, Rich forest green hue,Billowing sleeves, fitted at cuffs, Puff shoulder,Buttons to chest,Curved hem",
//     category: "Jacket",
//     material: "Organic Cotton and Elastane",
//     price: 23.95,
//     currency: "GBP",
//     image_url:
//       "https://www.wearethought.com/products/milou-organic-cotton-corduroy-shirt-forest-green",
//     colors: "Forest Green",
//     sizes: "6, 8, 10, 12, 14, 16, 18",
//   },
//   {
//     id: 18,
//     brand_id: 9,
//     name: "Faye Lenzing™ Ecovero™ Dobby Blouse",
//     description:
//       'Super soft and silky feel, "Notch neck" - round with V slit at the front, Pretty frill details at shoulder,a beautiful floral pattern on a faded rose pink background,balloon sleeves, more fitted at cuffs,"Dobby" textured weave finish',
//     category: "Top",
//     material: "renewable Wood",
//     price: 165.0,
//     currency: "GBP",
//     image_url:
//       "https://www.wearethought.com/products/faye-lenzing%E2%84%A2-ecovero%E2%84%A2-dobby-blouse-faded-rose-pink",
//     colors: "Faded Rose Pink",
//     sizes: "6, 8, 10, 12, 14, 16, 18",
//   },
//   {
//     id: 19,
//     brand_id: 10,
//     name: "Women's Midi Babydoll Dress",
//     description:
//       "Our best-selling Midi Babydoll Dress is back! Crafted from our plush long-staple Egyptian cotton jersey, the dress features a crewneck collar, a flattering empire waist and a three-tier flouncy skirt that’s made for effortless summer living.",
//     category: "Dress",
//     material: "Egyptian Cotton",
//     price: 88.0,
//     currency: "CAD",
//     image_url:
//       "https://kotn.com/products/womens-midi-babydoll-dress?colour=mirage&size=xs",
//     colors: "Black, Mirage",
//     sizes: "XS, S, M, L, XL, XXL",
//   },
//   {
//     id: 20,
//     brand_id: 10,
//     name: "Men’s Chambray Camp Shirt",
//     description:
//       "A vintage camp shirt, made from a lightweight 100% BCI Cotton Chambray denim. Featuring a boxy fit and workwear-inspired details, including double-lined pockets.",
//     category: "Shirt",
//     material: "BCI Cotton Chambray",
//     price: 138.0,
//     currency: "CAD",
//     image_url:
//       "https://kotn.com/products/mens-chambray-camp-shirt?colour=raw-rinse&size=xs",
//     colors: "Blue",
//     sizes: "XS, S, M, L, XL, XXL",
//   },
// ];
