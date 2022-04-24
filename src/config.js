const categories = ['Task', 'Random Thought', 'Idea'];

const tableConfig = {
  0: 'id',
  1: 'creationTime',
  2: 'content',
  3: 'contentDates',
  4: 'category'
};

const tableHeaderTemplate = `<tr>
                                <th rowspan="2">Id</th>
                                <th rowspan="2">Time of creation</th>
                                <th colspan="2">Content</th>
                                <th rowspan="2">Category</th>
                                </tr>
                                <tr>
                                <th>Text</th>
                                <th>Dates</th>
                              </tr>`;

export { categories, tableConfig, tableHeaderTemplate };
