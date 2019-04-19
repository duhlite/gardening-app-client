const vegBase = [
    {
        speciesId: 1,
        species: 'asparagus',
        rotation: 0,
        zone: ['3a','3b','4b','4a','5a','5b','6a','6b','7a','7b','8a','8b']
    },
    {
        speciesId: 2,
        species: 'bush bean',
        rotation: 2,
        zone: ['3a','3b','4b','4a','5a','5b','6a','6b','7a','7b','8a','8b','9a','9b']
    },
    {
        speciesId: 3,
        species: 'pole bean',
        rotation: 2,
        zone: ['3a','3b','4b','4a','5a','5b','6a','6b','7a','7b','8a','8b','9a','9b']
    },
    {
        speciesId: 4,
        species: 'beet',
        rotation: 5,
        zone: ['3a','3b','4b','4a','5a','5b','6a','6b','7a','7b','8a','8b','9a','9b']
    },
    {
        speciesId: 5,
        species: 'broccoli',
        rotation: 1,
        zone: ['3a','3b','4b','4a','5a','5b','6a','6b','7a','7b','8a','8b','9a','9b']
    },
    {
        speciesId: 6,
        species: 'cabbage',
        rotation: 1,
        zone: ['3a','3b','4b','4a','5a','5b','6a','6b','7a','7b','8a','8b','9a','9b']
    },
    {
        speciesId: 7,
        species: 'carrot',
        rotation: 5,
        zone: ['3a','3b','4b','4a','5a','5b','6a','6b','7a','7b','8a','8b','9a','9b']
    },
    {
        speciesId: 8,
        species: 'chard',
        rotation: 5,
        zone: ['3a','3b','4b','4a','5a','5b','6a','6b','7a','7b','8a','8b','9a','9b']
    },
    {
        speciesId: 9,
        species: 'cauliflower',
        rotation: 1,
        zone: ['3a','3b','4b','4a','5a','5b','6a','6b','7a','7b','8a','8b','9a','9b']
    },
    {
        speciesId: 10,
        species: 'brussels sprout',
        rotation: 1,
        zone: ['3a','3b','4b','4a','5a','5b','6a','6b','7a','7b','8a','8b','9a','9b']
    },
    {
        speciesId: 11,
        species: 'kohlrabi',
        rotation: 1,
        zone: ['3a','3b','4b','4a','5a','5b','6a','6b','7a','7b','8a','8b','9a','9b']
    },
    {
        speciesId: 12,
        species: 'corn',
        rotation: 3,
        zone: ['3a','3b','4b','4a','5a','5b','6a','6b','7a','7b','8a','8b','9a','9b']
    },
    {
        speciesId: 13,
        species: 'cucumber',
        rotation: 3,
        zone: ['3a','3b','4b','4a','5a','5b','6a','6b','7a','7b','8a','8b','9a','9b']
    },
    {
        speciesId: 14,
        species: 'eggplant',
        rotation: 3,
        zone: ['3a','3b','4b','4a','5a','5b','6a','6b','7a','7b','8a','8b','9a','9b']
    },
    {
        speciesId: 15,
        species: 'garlic',
        rotation: 4,
        zone: ['3a','3b','4b','4a','5a','5b','6a','6b','7a','7b','8a','8b','9a','9b']
    },
    {
        speciesId: 16,
        species: 'gourd',
        rotation: 3,
        zone: ['3a','3b','4b','4a','5a','5b','6a','6b','7a','7b','8a','8b','9a','9b']
    },
    {
        speciesId: 17,
        species: 'spinach',
        rotation: 5,
        zone: ['3a','3b','4b','4a','5a','5b','6a','6b','7a','7b','8a','8b','9a','9b']
    },
    {
        speciesId: 18,
        species: 'kale',
        rotation: 1,
        zone: ['3a','3b','4b','4a','5a','5b','6a','6b','7a','7b','8a','8b','9a','9b']
    },
    {
        speciesId: 19,
        species: 'endive',
        rotation: 5,
        zone: ['3a','3b','4b','4a','5a','5b','6a','6b','7a','7b','8a','8b','9a','9b']
    },
    {
        speciesId: 20,
        species: 'turnip',
        rotation: 1,
        zone: ['3a','3b','4b','4a','5a','5b','6a','6b','7a','7b','8a','8b','9a','9b']
    },
    {
        speciesId: 21,
        species: 'mustard',
        rotation: 1,
        zone: ['3a','3b','4b','4a','5a','5b','6a','6b','7a','7b','8a','8b','9a','9b']
    },
    {
        speciesId: 22,
        species: 'collard',
        rotation: 1,
        zone: ['3a','3b','4b','4a','5a','5b','6a','6b','7a','7b','8a','8b','9a','9b']
    },
    {
        speciesId: 23,
        species: 'arugula',
        rotation: 5,
        zone: ['3a','3b','4b','4a','5a','5b','6a','6b','7a','7b','8a','8b','9a','9b']
    },
    {
        speciesId: 24,
        species: 'lettuce',
        rotation: 5,
        zone: ['3a','3b','4b','4a','5a','5b','6a','6b','7a','7b','8a','8b','9a','9b']
    },
    {
        speciesId: 25,
        species: 'cantaloupe',
        rotation: 3,
        zone: ['3a','3b','4b','4a','5a','5b','6a','6b','7a','7b','8a','8b','9a','9b']
    },
    {
        speciesId: 26,
        species: 'watermelon',
        rotation: 3,
        zone: ['3a','3b','4b','4a','5a','5b','6a','6b','7a','7b','8a','8b','9a','9b']
    },
    {
        speciesId: 27,
        species: 'honeydew',
        rotation: 3,
        zone: ['3a','3b','4b','4a','5a','5b','6a','6b','7a','7b','8a','8b','9a','9b']
    },
    {
        speciesId: 28,
        species: 'okra',
        rotation: 3,
        zone: ['3a','3b','4b','4a','5a','5b','6a','6b','7a','7b','8a','8b','9a','9b']
    },
    {
        speciesId: 29,
        species: 'onion',
        rotation: 4,
        zone: ['3a','3b','4b','4a','5a','5b','6a','6b','7a','7b','8a','8b','9a','9b']
    },
    {
        speciesId: 30,
        species: 'leek',
        rotation: 4,
        zone: ['3a','3b','4b','4a','5a','5b','6a','6b','7a','7b','8a','8b','9a','9b']
    },
    {
        speciesId: 31,
        species: 'snow pea',
        rotation: 2,
        zone: ['3a','3b','4b','4a','5a','5b','6a','6b','7a','7b','8a','8b','9a','9b']
    },
    {
        speciesId: 32,
        species: 'shelling pea',
        rotation: 2,
        zone: ['3a','3b','4b','4a','5a','5b','6a','6b','7a','7b','8a','8b','9a','9b']
    },
    {
        speciesId: 33,
        species: 'snap pea',
        rotation: 2,
        zone: ['3a','3b','4b','4a','5a','5b','6a','6b','7a','7b','8a','8b','9a','9b']
    },
    {
        speciesId: 34,
        species: 'sweet pepper',
        rotation: 3,
        zone: ['3a','3b','4b','4a','5a','5b','6a','6b','7a','7b','8a','8b','9a','9b']
    },
    {
        speciesId: 35,
        species: 'hot pepper',
        rotation: 3,
        zone: ['3a','3b','4b','4a','5a','5b','6a','6b','7a','7b','8a','8b','9a','9b']
    },
    {
        speciesId: 36,
        species: 'potato',
        rotation: 5,
        zone: ['3a','3b','4b','4a','5a','5b','6a','6b','7a','7b','8a','8b','9a','9b']
    },
    {
        speciesId: 37,
        species: 'pumpkin',
        rotation: 3,
        zone: ['3a','3b','4b','4a','5a','5b','6a','6b','7a','7b','8a','8b','9a','9b']
    },
    {
        speciesId: 38,
        species: 'radish',
        rotation: 1,
        zone: ['3a','3b','4b','4a','5a','5b','6a','6b','7a','7b','8a','8b','9a','9b']
    },
    {
        speciesId: 39,
        species: 'rhubarb',
        rotation: 0,
        zone: ['3a','3b','4b','4a','5a','5b','6a','6b','7a','7b','8a','8b']
    },
    {
        speciesId: 40,
        species: 'parsnip',
        rotation: 5,
        zone: ['3a','3b','4b','4a','5a','5b','6a','6b','7a','7b','8a','8b','9a','9b']
    },
    {
        speciesId: 41,
        species: 'celery',
        rotation: 5,
        zone: ['3a','3b','4b','4a','5a','5b','6a','6b','7a','7b','8a','8b','9a','9b']
    },
    {
        speciesId: 42,
        species: 'rutabaga',
        rotation: 5,
        zone: ['3a','3b','4b','4a','5a','5b','6a','6b','7a','7b','8a','8b','9a','9b']
    },
    {
        speciesId: 43,
        species: 'horseradish',
        rotation: 0,
        zone: ['3a','3b','4b','4a','5a','5b','6a','6b','7a','7b','8a','8b']
    },
    {
        speciesId: 44,
        species: 'jerusalem artichoke',
        rotation: 0,
        zone: ['3a','3b','4b','4a','5a','5b','6a','6b','7a','7b','8a','8b']
    },
    {
        speciesId: 45,
        species: 'summer squash',
        rotation: 3,
        zone: ['3a','3b','4b','4a','5a','5b','6a','6b','7a','7b','8a','8b','9a','9b']
    },
    {
        speciesId: 46,
        species: 'winter squash',
        rotation: 3,
        zone: ['3a','3b','4b','4a','5a','5b','6a','6b','7a','7b','8a','8b','9a','9b']
    },
    {
        speciesId: 47,
        species: 'sweet potato',
        rotation: 3,
        zone: ['3a','3b','4b','4a','5a','5b','6a','6b','7a','7b','8a','8b','9a','9b']
    },
    {
        speciesId: 48,
        species: 'tomato',
        rotation: 3,
        zone: ['3a','3b','4b','4a','5a','5b','6a','6b','7a','7b','8a','8b','9a','9b']
    }
]

export default vegBase;