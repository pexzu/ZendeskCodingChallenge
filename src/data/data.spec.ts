import { getAvailableSearchFields, getAllInfo } from './data';
import path from 'path';

test.only('getting available search field data is accurate', async () => {
  expect.assertions(1);
  const data = await getAvailableSearchFields(path.join(__dirname, './mock.json'));
  expect(data).toStrictEqual({
    _id: 1,
    hobbies: ['rock climbing', 'cooking', 'gardening', 'learning'],
    name: 'Vishnu',
  });
});


test.only('the data is accurate on single item return', async () => {
    expect.assertions(1);
    const data = await getAllInfo("_id","2",path.join(__dirname, './mock.json'));
    expect(data).toStrictEqual([{
        "_id": 2,
        "hobbies": ["learning", "coding", "travelling", "DJing", "reading"],
        "name": "Yuri"
    }]);
  });
  
  
  test.only('the data is accurate for multiple item return', async () => {
    expect.assertions(1);
    const data = await getAllInfo("hobbies","learning",path.join(__dirname, './mock.json'));
    expect(data).toStrictEqual([{
        "_id": 1,
        "name": "Vishnu",
        "hobbies": ["rock climbing", "cooking", "gardening", "learning"]
      },
      {
        "_id": 2,
        "name": "Yuri",
        "hobbies": ["learning", "coding", "travelling", "DJing", "reading"]
      }
      ]);
  });