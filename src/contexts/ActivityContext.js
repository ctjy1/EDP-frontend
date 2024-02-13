import { createContext } from 'react';

const ActivityContext = createContext({
  activity: null,
  setActivity: () => {}
});

export default ActivityContext;