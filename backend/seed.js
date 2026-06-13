const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Testimonial = require('./models/Testimonial');
const Gallery = require('./models/Gallery');

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');

  // Create admin user
  const existing = await User.findOne({ email: 'admin@giggleskids.com' });
  if (!existing) {
    await User.create({
      name: 'Giggles Admin',
      email: 'admin@giggleskids.com',
      phone: '+919916476751',
      password: 'Admin@123',
      role: 'admin',
    });
    console.log('✅ Admin user created: admin@giggleskids.com / Admin@123');
  } else {
    console.log('ℹ️  Admin user already exists');
  }

  // Seed testimonials
  const testimonialsCount = await Testimonial.countDocuments();
  if (testimonialsCount === 0) {
    await Testimonial.insertMany([
      { name: 'Priya Sharma', review: 'Well maintained and hygienic kids indoor play area. My kids absolutely love coming here!', rating: 5, source: 'google', isFeatured: true },
      { name: 'Rahul Mehta', review: 'Colorful and cheerful atmosphere with welcoming staff. Safety measures are top-notch.', rating: 5, source: 'google', isFeatured: true },
      { name: 'Deepa Nair', review: 'Perfect place for birthday celebrations. The Gold package was absolutely magical!', rating: 5, source: 'google', isFeatured: true },
      { name: 'Arjun Krishnan', review: 'Best play area in Bengaluru! Clean, safe, and so much fun. Membership plan is totally worth it.', rating: 5, source: 'google' },
    ]);
    console.log('✅ Testimonials seeded');
  }

  // Seed gallery
  const galleryCount = await Gallery.countDocuments();
  if (galleryCount === 0) {
    await Gallery.insertMany([
      { title: 'Kids in Ball Pool', imageUrl: 'https://images.unsplash.com/photo-1576633587382-13ddf37b1fc1?w=600', category: 'play-zones', order: 1 },
      { title: 'Birthday Celebration', imageUrl: 'https://images.unsplash.com/photo-1533294455009-a77b7557d2d1?w=600', category: 'birthday', order: 2 },
      { title: 'Soft Play Zone', imageUrl: 'https://images.unsplash.com/photo-1566454544259-f4b94c3d758c?w=600', category: 'play-zones', order: 3 },
      { title: 'Happy Kids', imageUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600', category: 'general', order: 4 },
    ]);
    console.log('✅ Gallery seeded');
  }

  console.log('\n🎉 Seed complete!');
  process.exit(0);
}

seed().catch((err) => { console.error(err); process.exit(1); });
