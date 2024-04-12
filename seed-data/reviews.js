const {
  fetchScrapeAPIResource,
  getCountedId,
  initialCountObj,
} = require("../utils");

const SCRAPE_API_COMMENT_COUNT = 50;

const PRODUCTS_MIN_ID = 1;
const PRODUCTS_MAX_ID = SCRAPE_API_COMMENT_COUNT / 2;

const USERS_MIN_ID = 101;
const USERS_MAX_ID = 111;
const USERS_COUNT = USERS_MAX_ID - USERS_MIN_ID;

exports.cleanupReviews = async () => {
  const comments = await fetchScrapeAPIResource(
    `/comments?limit=${SCRAPE_API_COMMENT_COUNT}`,
    "comments"
  );

  const obj_countedProducts = initialCountObj(
    PRODUCTS_MIN_ID,
    PRODUCTS_MAX_ID
  );
  const obj_countedUsers = initialCountObj(USERS_MIN_ID, USERS_MAX_ID);

  const reviews = comments.map((comment) => {
    const product_id = getCountedId(
      obj_countedProducts,
      SCRAPE_API_COMMENT_COUNT / PRODUCTS_MAX_ID
    );
    const user_id = getCountedId(
      obj_countedUsers,
      SCRAPE_API_COMMENT_COUNT / USERS_COUNT
    );

    const rating = parseFloat((Math.random() * (5.1 - 1) + 1).toPrecision(2));

    return {
      id: comment.id,
      product_id,
      user_id,
      rating,
      comment: comment.body,
    };
  });

  return reviews;
};

// module.exports = [
//   {
//     id: 1,
//     product_id: 1,
//     user_id: 101,
//     rating: 4.5,
//     comment:
//       "I absolutely love this muscle tee! The material feels soft and comfortable, and the fit is just right for me. I especially appreciate that it's made from organic cotton, which aligns with my values for sustainability. The rib-trim crewneck adds a nice touch, and the longer armholes give it a relaxed yet stylish look. Overall, I highly recommend this tee!",
//   },
//   {
//     id: 2,
//     product_id: 2,
//     user_id: 102,
//     rating: 5,
//     comment:
//       "I adore this linen dress! The oversized fit is incredibly comfortable and flattering. The puff sleeves and gathered waist add a stylish touch without being too overwhelming. The linen material is light and breathable, perfect for warmer weather. I've received so many compliments every time I wear it.It's definitely become one of my favorite pieces in my wardrobe!",
//   },
//   {
//     id: 3,
//     product_id: 3,
//     user_id: 103,
//     rating: 4.2,
//     comment:
//       "I'm really happy with my purchase of the Joy One Piece Swimsuit! The fit is great, and the high-cut legs give it a stylish and retro vibe. I appreciate that it's made from recycled nylon, as sustainability is important to me. The material feels high quality and comfortable. The only reason I didn't give it a perfect rating is that I found the straps a bit too tight for my liking, but overall, it's a fantastic swimsuit!",
//   },
//   {
//     id: 4,
//     product_id: 4,
//     user_id: 104,
//     rating: 4.8,
//     comment:
//       "I absolutely love the Paddle One Piece Swimsuit! The square neckline and low-cut back give it a chic and modern look. The adjustable straps are a great feature, allowing me to customize the fit to my liking. Plus, knowing that it's made from recycled nylon makes me feel good about my purchase. The swimsuit is comfortable, flattering, and perfect for both lounging by the pool and swimming laps. Highly recommend!",
//   },
//   {
//     id: 5,
//     product_id: 5,
//     user_id: 105,
//     rating: 4.7,
//     comment:
//       "I recently purchased the Men's Torrentshell 3L Rain Jacket, and I couldn't be happier with it! The jacket is incredibly lightweight and packable, making it perfect for outdoor adventures. Despite its lightweight construction, it provides excellent protection from rain and wind. The adjustable hood and zippered pockets are practical features, and I appreciate the sustainability aspect of the jacket being made from recycled nylon. Overall, it's a high-quality jacket that I would highly recommend to anyone in need of a reliable rain jacket.",
//   },
//   {
//     id: 6,
//     product_id: 6,
//     user_id: 106,
//     rating: 4.5,
//     comment:
//       "I recently purchased the Women's Tropic Comfort Natural UPF Hoody for hiking and outdoor activities, and it has exceeded my expectations! The fabric is incredibly soft and comfortable against the skin, and it provides excellent sun protection without feeling too heavy or restrictive. I love the hood with adjustable drawcord, which comes in handy on windy days. The thumb loops are a nice touch for added coverage, and the zippered security pocket is perfect for storing small essentials. Overall, it's a fantastic hoody that I would highly recommend to anyone looking for sun protection and comfort in warm conditions.",
//   },
//   {
//     id: 7,
//     product_id: 7,
//     user_id: 107,
//     rating: 4.0,
//     comment:
//       "I recently purchased the Sexy Robot Oversized Organic Cotton T-Shirt, and I'm in love with it! The oversized fit is incredibly comfortable and perfect for a relaxed yet stylish look. The organic cotton material feels soft and high-quality against the skin. I love the playful 'Sexy Robot' graphic, which adds a fun and unique touch to the t-shirt. I've received so many compliments whenever I wear it. The only downside is that it's a bit pricey, but considering the quality and sustainability of the material, I think it's worth the investment!",
//   },
//   {
//     id: 8,
//     product_id: 8,
//     user_id: 108,
//     rating: 4.5,
//     comment:
//       "I recently purchased the Stella McCartney Platinum Dream Embroidered Oversized Denim Shirt, and I'm thrilled with it! The embroidery detail is stunning and adds a unique touch to the classic denim shirt. The oversized fit is super comfortable and perfect for layering. The quality of the denim is exceptional, and it's holding up well after multiple wears and washes. I've received so many compliments whenever I wear it. Definitely a standout piece in my wardrobe!",
//   },
//   {
//     id: 9,
//     product_id: 9,
//     user_id: 109,
//     rating: 4.5,
//     comment:
//       "I absolutely love the Leora Wrap Dress! It's so flattering and comfortable. The wrap design allows for a perfect fit, and the fabric is soft and high-quality. I've received numerous compliments every time I wear it.",
//   },
//   {
//     id: 10,
//     product_id: 10,
//     user_id: 110,
//     rating: 4.2,
//     comment:
//       "The Bessie Striped Dress is a wardrobe staple! It's versatile and can be dressed up or down for any occasion. The stripes are timeless, and the fit is just right. I've worn it to work, brunch, and even for casual outings with friends.",
//   },
//   {
//     id: 11,
//     product_id: 11,
//     user_id: 111,
//     rating: 4.7,
//     comment:
//       "The Organic Linen Lantern Pant is a must-have for my wardrobe! It's comfortable, stylish, and versatile. The organic linen fabric is lightweight and breathable, perfect for warmer days. The lantern silhouette adds a unique touch, and the elastic waistband ensures a comfortable fit all day long.",
//   },
//   {
//     id: 12,
//     product_id: 12,
//     user_id: 112,
//     rating: 4.9,
//     comment:
//       "I adore the Crushed Silk Tiered dress! It's elegant, feminine, and incredibly comfortable. The silk fabric drapes beautifully, and the tiered design adds a romantic flair. I've received so many compliments whenever I wear it. It's perfect for special occasions or a night out.",
//   },
//   {
//     id: 13,
//     product_id: 13,
//     user_id: 113,
//     rating: 4.6,
//     comment:
//       "I'm impressed with the quality of the Regenerative Cotton Crop Lines T-Shirt! The fabric is soft and comfortable, and the fit is just right. I love that it's made from regenerative cotton, contributing to sustainable agriculture practices. The crop lines design adds a stylish touch. Overall, a great addition to my wardrobe.",
//   },
//   {
//     id: 14,
//     product_id: 14,
//     user_id: 114,
//     rating: 4.8,
//     comment:
//       "The InMotion Sleeveless Jumpsuit is my new favorite! It's incredibly comfortable and versatile. The fabric is soft and stretchy, perfect for all-day wear. The sleeveless design keeps me cool, and the adjustable waist tie cinches in nicely for a flattering silhouette. I've worn it for workouts, errands, and even casual outings. Love it!",
//   },
//   {
//     id: 15,
//     product_id: 15,
//     user_id: 115,
//     rating: 4.5,
//     comment:
//       "I'm loving the Stretch French Terry Zip Hoodie! It's so cozy and comfortable. The French terry fabric is soft against the skin, and the zip-up design is convenient for layering. It's become my go-to hoodie for lounging at home or running errands. Highly recommend!",
//   },
//   {
//     id: 16,
//     product_id: 16,
//     user_id: 116,
//     rating: 4.7,
//     comment:
//       "The Coastal Double Gauze Ruffle Maxi Dress is a dream! It's lightweight, breezy, and perfect for warm weather. The double gauze fabric is soft and breathable, and the ruffle detailing adds a feminine touch. I've worn it to beach picnics and summer parties, and it always gets compliments.",
//   },
//   {
//     id: 17,
//     product_id: 17,
//     user_id: 117,
//     rating: 4.6,
//     comment:
//       "I'm loving the Milou Organic Cotton Corduroy Shirt! It's stylish and sustainable. The organic cotton corduroy fabric feels soft and durable, and the fit is just right. I appreciate the attention to detail in the design. It's become a staple in my wardrobe!",
//   },
//   {
//     id: 18,
//     product_id: 18,
//     user_id: 118,
//     rating: 4.8,
//     comment:
//       "The Faye Lenzing™ Ecovero™ Dobby Blouse is absolutely beautiful! The fabric is soft and luxurious, and the dobby detailing adds a sophisticated touch. I love that it's made from sustainable materials. It's perfect for both casual and dressy occasions.",
//   },
//   {
//     id: 19,
//     product_id: 19,
//     user_id: 119,
//     rating: 4.7,
//     comment:
//       "I adore the Women's Midi Babydoll Dress! It's incredibly comfortable and flattering. The fabric is soft and breathable, and the midi length is perfect for everyday wear. The babydoll style adds a cute, feminine touch. I've received so many compliments whenever I wear it!",
//   },
//   {
//     id: 20,
//     product_id: 20,
//     user_id: 120,
//     rating: 4.5,
//     comment:
//       "The Men’s Chambray Camp Shirt is a wardrobe essential! It's versatile and stylish, perfect for both casual and semi-formal occasions. The chambray fabric is soft and comfortable, and the fit is just right. It's become my go-to shirt for weekends and outdoor activities.",
//   },
// ];
