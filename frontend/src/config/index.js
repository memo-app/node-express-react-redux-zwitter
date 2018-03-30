// Configurations for Frontend
const NODE_ENV = (process.env.NODE_ENV === 'production') ? 'production' : 'development';

export default require(`./${NODE_ENV}.json`);