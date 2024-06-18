import { AirtableRecordType, CoffeeStoreType } from '@/types';

var Airtable = require('airtable');
var base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN }).base('appIg3j8czP6U0egC');

const table = base('coffee-stores');

// find the record

const getMinifiedRecords = (records: Array<AirtableRecordType>) => {
  return records.map((record: AirtableRecordType) => {
    return {
      recordId: record.id,
      ...record.fields,
    };
  });
};

const findRecordByFilter = async (id: string) => {
  const findRecords = await table
    .select({
      filterByFormula: `id="${id}"`,
    })
    .firstPage();

  return getMinifiedRecords(findRecords);
};

// create record if not found

export const createCoffeeStore = async (coffeStore: CoffeeStoreType, id: string) => {
  const { name, address, voting = 0, imgUrl } = coffeStore;

  try {
    if (id) {
      const records = await findRecordByFilter(id);
      if (records.length === 0) {
        const createRecords = await table.create([
          {
            fields: {
              id,
              name,
              address,
              voting,
              imgUrl,
            },
          },
        ]);
        if (createRecords.length > 0) {
          return getMinifiedRecords(createRecords);
        }
      } else {
        //return
        console.log('Coffee Store exists');
        return records;
      }
    } else {
      console.error('Store id is missing');
    }
  } catch (error) {
    console.error('Error creating or finding a store', error);
  }
};
