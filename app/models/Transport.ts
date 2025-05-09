import { Vehicle } from './Vehicle';

// Экспортируем Vehicle как Transport для совместимости
export { Vehicle as Transport };
export default Vehicle;

// Перенаправляем все типы из Vehicle
export * from './Vehicle'; 