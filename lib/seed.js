const { PrismaClient, Role, UserStatus } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

const seed = async () => {
  try {
    const users = [];
    for (let i = 0; i < 10; i++) {
      users.push({
        email: faker.internet.email(),
        password: "21212121",
        location: faker.helpers.arrayElement([
          "Addis Ababa",
          "Dire Dawa",
          "Mekelle",
          "Gondar",
          "Hawassa",
          "Bahir Dar",
          "Jijiga",
          "Jimma",
          "Dessie",
          "Bishoftu",
          "Paris",
          "New York",
          "Tokyo",
          "London",
          "Dubai",
          "Sydney",
          "Cape Town",
          "Moscow",
          "Rio de Janeiro",
          "Singapore",
        ]),
        status: faker.helpers.arrayElement([
          UserStatus.ACTIVE,
          UserStatus.DISABLED,
        ]),
        phone: faker.helpers.arrayElement([
          "+251911234567",
          "+251921345678",
          "+251931456789",
          "+251941567890",
          "+251951678901",
          "+251961789012",
          "+251971890123",
          "+251981901234",
          "+251991012345",
        ]),
        roleId: faker.helpers.arrayElement([1, 2, 3]),
        approved: faker.datatype.boolean(Math.random()),
      });
    }

    const createdUsers = [];
    for (const user of users) {
      const createdUser = await prisma.user.create({
        data: user,
      });
      createdUsers.push(createdUser);
    }

    const bookCategory = [
      "Fiction",
      "Non-Fiction",
      "Science Fiction",
      "Fantasy",
      "Mystery",
      "Thriller",
      "Romance",
      "Historical Fiction",
      "Biography",
      "Autobiography",
      "Self-Help",
      "Cookbooks",
      "Travel",
      "Science",
      "History",
      "Religion",
      "Art",
      "Poetry",
      "Children's",
    ];

    const CreatedBookCategory = [];
    for (const cat of bookCategory) {
      const createdCategory = await prisma.category.create({
        data: {
          name: cat,
        },
      });
      CreatedBookCategory.push(createdCategory.id);
    }

    const ethiopianBooks = [
      {
        title: "Cutting for Stone",
        author: "Abraham Verghese",
        country: "Ethiopia",
      },
      {
        title: "The Beautiful Things That Heaven Bears",
        author: "Dinaw Mengestu",
        country: "Ethiopia",
      },
      {
        title: "Beneath the Lion's Gaze",
        author: "Maaza Mengiste",
        country: "Ethiopia",
      },
      {
        title: "Sweetness in the Belly",
        author: "Camilla Gibb",
        country: "Ethiopia",
      },
      {
        title: "The Orchard of Lost Souls",
        author: "Nadia Hashimi",
        country: "Ethiopia",
      },
      {
        title: "Abyssinian Chronicles",
        author: "Moses Isegawa",
        country: "Ethiopia",
      },
      {
        title: "The Shadow King",
        author: "Maaza Mengiste",
        country: "Ethiopia",
      },
      {
        title: "The Consequences of Love",
        author: "Sulaiman Addonia",
        country: "Ethiopia",
      },
      {
        title: "The God Who Begat a Jackal",
        author: "Nega Mezlekia",
        country: "Ethiopia",
      },
      {
        title: "Fistula, Flight, and Freedom",
        author: "Mammo Muchie",
        country: "Ethiopia",
      },
      {
        title: "The Fortunes of Africa",
        author: "Martin Meredith",
        country: "Ethiopia",
      },
      {
        title: "The Emperor",
        author: "Ryszard Kapuściński",
        country: "Ethiopia",
      },
      {
        title: "The Quest for Socialist Utopia",
        author: "Bahru Zewde",
        country: "Ethiopia",
      },
      {
        title: "Notes from the Hyena's Belly",
        author: "Nega Mezlekia",
        country: "Ethiopia",
      },
      {
        title: "The Beautiful Things That Heaven Bears",
        author: "Dinaw Mengestu",
        country: "Ethiopia",
      },
      {
        title: "The Shadow King",
        author: "Maaza Mengiste",
        country: "Ethiopia",
      },
      {
        title: "The Consequences of Love",
        author: "Sulaiman Addonia",
        country: "Ethiopia",
      },
      {
        title: "The God Who Begat a Jackal",
        author: "Nega Mezlekia",
        country: "Ethiopia",
      },
      {
        title: "Abyssinian Chronicles",
        author: "Moses Isegawa",
        country: "Ethiopia",
      },
      {
        title: "Fistula, Flight, and Freedom",
        author: "Mammo Muchie",
        country: "Ethiopia",
      },
      {
        title: "The Emperor",
        author: "Ryszard Kapuściński",
        country: "Ethiopia",
      },
      {
        title: "The Quest for Socialist Utopia",
        author: "Bahru Zewde",
        country: "Ethiopia",
      },
      {
        title: "Notes from the Hyena's Belly",
        author: "Nega Mezlekia",
        country: "Ethiopia",
      },
      {
        title: "The Fortunes of Africa",
        author: "Martin Meredith",
        country: "Ethiopia",
      },
      {
        title: "Sweetness in the Belly",
        author: "Camilla Gibb",
        country: "Ethiopia",
      },
      {
        title: "The Orchard of Lost Souls",
        author: "Nadia Hashimi",
        country: "Ethiopia",
      },
    ];

    const books = [];
    for (let i = 0; i < ethiopianBooks.length - 1; i++) {
      const user = faker.helpers.arrayElement(
        createdUsers.filter((user) => user.roleId === 2)
      );
      const title = ethiopianBooks[i].title;
      const author = ethiopianBooks[i].author;
      books.push({
        title,
        author,
        ownerId: user.id,
        categoryId: faker.helpers.arrayElement(CreatedBookCategory),
        quantity: faker.number.int({ min: 1, max: 7 }),
        price: faker.number.float({ min: 10, max: 100, fractionDigits: 2 }),
      });
    }
    const createdBooks = [];
    for (const book of books) {
      const createdBook = await prisma.book.create({
        data: book,
      });
      createdBooks.push(createdBook);
    }

    const rents = [];
    for (let i = 0; i < 41; i++) {
      const books = faker.helpers.arrayElement(createdBooks);
      const renterUser = faker.helpers.arrayElement(
        createdUsers.filter((user) => user.roleId === 2)
      );
      rents.push({
        book: {
          renterId: renterUser.id,
          bookId: books.id,
          price: books.price,
          startDate: new Date(),
          endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
          createdAt: faker.date.between({
            from: "2024-07-01T00:00:00.000Z",
            to: "2024-08-31T23:59:59.999Z",
          }),
        },
        ownerId: books.ownerId,
      });
    }
    for (const rent of rents) {
      await prisma.rent.create({
        data: rent.book,
      });
      await prisma.income.create({
        data: {
          amount: rent.book.price,
          ownerId: rent.ownerId,
        },
      });
    }

    console.log(" 🚀️ 🚀️ 🚀️ completed successfully.");
  } catch (error) {
    console.error("💥️ 💥️ 💥️ Error :", error);
  } finally {
    await prisma.$disconnect();
  }
};

seed();
