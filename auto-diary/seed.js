const BASE_URL = 'http://localhost:3030';

const adminCredentials = { email: 'admin@abv.bg', password: 'admin' };
const kapkaCredentials = { email: 'kapchoni@gmail.com', password: '1234' };
const kapkaRegisterData = {
  username: 'Kapka',
  email: 'kapchoni@gmail.com',
  password: '1234',
  tel: '+359888123456'
};

const adminCars = [
  {
    brand: 'BMW', model: '320d', year: 2019,
    engineType: '2.0 TDI 190hp', initialMileage: 45000, fuelType: 'diesel',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/2019_BMW_320d_M_Sport_%28G20%29%2C_front_8.28.19.jpg/1280px-2019_BMW_320d_M_Sport_%28G20%29%2C_front_8.28.19.jpg'
  },
  {
    brand: 'Toyota', model: 'Yaris', year: 2021,
    engineType: '1.5 Hybrid 116hp', initialMileage: 12000, fuelType: 'hybrid',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/2020_Toyota_Yaris_Icon_1.5_Front.jpg/1280px-2020_Toyota_Yaris_Icon_1.5_Front.jpg'
  },
  {
    brand: 'Volkswagen', model: 'Golf', year: 2017,
    engineType: '1.6 TDI 115hp', initialMileage: 87000, fuelType: 'diesel',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/VW_Golf_VII_Facelift_front_MK1_Motor_Show_2017.jpg/1280px-VW_Golf_VII_Facelift_front_MK1_Motor_Show_2017.jpg'
  }
];

const kapkaCar = {
  brand: 'Opel', model: 'Monterey', year: 1997,
  engineType: '3.1 TDI', initialMileage: 150000, fuelType: 'diesel', imageUrl: ''
};

async function login(credentials) {
  const res = await fetch(`${BASE_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  if (!res.ok) throw new Error(`Login failed: ${res.status}`);
  return res.json();
}

async function register(userData) {
  const res = await fetch(`${BASE_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  if (!res.ok) throw new Error(`Register failed: ${res.status}`);
  return res.json();
}

async function post(url, data, token) {
  const res = await fetch(`${BASE_URL}${url}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Authorization': token },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(`POST ${url} failed: ${res.status}`);
  return res.json();
}

async function seedRecordsForCar(carId, token, carName) {
  await post('/data/fuel', {
    carId, date: '2026-03-15', mileage: 52000, liters: 45,
    unitPrice: 1.89, price: 85.05, roadType: 'градско',
    gasStation: 'Lukoil', comment: 'Редовно зареждане'
  }, token);
  console.log(`  ✓ Горивен запис за ${carName}`);

  await post('/data/service-records', {
    carId, type: 'Смяна на масло', brand: 'Castrol Edge 5W-30',
    mileage: 51500, price: 120, date: '2026-02-10',
    nextServiceDate: '2027-02-10', nextServiceMileage: 61500,
    comment: 'Сменени маслен филтър и масло'
  }, token);
  console.log(`  ✓ Сервизен запис за ${carName}`);

  await post('/data/documents', {
    carId, type: 'civil_liability', title: 'Гражданска отговорност',
    date: '2026-01-01', price: 180, brand: 'Булстрад',
    expiryDate: '2027-01-01', comment: 'Платена за цяла година'
  }, token);
  console.log(`  ✓ Документ за ${carName}`);
}

async function seed() {
  try {
    console.log('\n👤 Логване като admin...');
    const adminData = await login(adminCredentials);
    console.log('✓ Admin логнат');

    for (const car of adminCars) {
      const created = await post('/data/cars', car, adminData.accessToken);
      console.log(`\n🚗 ${created.brand} ${created.model}`);
      await seedRecordsForCar(created._id, adminData.accessToken, `${created.brand} ${created.model}`);
    }

    console.log('\n👤 Регистриране на Kapka...');
    let kapkaToken;
    try {
      const kapkaData = await register(kapkaRegisterData);
      kapkaToken = kapkaData.accessToken;
      console.log('✓ Kapka регистрирана');
    } catch {
      console.log('Потребителят съществува, логване...');
      const kapkaData = await login(kapkaCredentials);
      kapkaToken = kapkaData.accessToken;
      console.log('✓ Kapka логната');
    }

    const kapkaCarCreated = await post('/data/cars', kapkaCar, kapkaToken);
    console.log(`\n🚗 ${kapkaCarCreated.brand} ${kapkaCarCreated.model}`);
    await seedRecordsForCar(kapkaCarCreated._id, kapkaToken, `${kapkaCarCreated.brand} ${kapkaCarCreated.model}`);

    console.log('\n✅ Seed завършен успешно!');
  } catch (err) {
    console.error('❌ Грешка:', err.message);
  }
}

seed();
