function deepCopy(obj, copies = new WeakMap()) {
 
  //Обработка простых свойств объекта
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
 //Проверка: если объект уже скопирован
 if (copies.has(obj)) {
    return copies.get(obj);
  }
  // обработка типов данных Date,
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }
  // обработка типов данных Map
  if (obj instanceof Map) {
    return new Map(Array.from(obj));
  }
   // обработка типов данных Set
  if (obj instanceof Set) {
    return new Set(Array.from(obj));
  }
//Обработка массивов
 if (Array.isArray(obj)) {
    const copy = [];
    copies.set(obj, copy);
    obj.forEach((item, index) => {
      copy[index] = deepCopy(item, copies);
    });
    return copy;
  }

  // Обработка вложенных объектов
const copiedObj = {};
  copies.set(obj, copiedObj);
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      copiedObj[key] = deepCopy(obj[key], copies);
    }
  }

  // Обработка символов и функций
  const symbols = Object.getOwnPropertySymbols(obj);
  for (const symbol of symbols) {
    copiedObj[symbol] = deepCopy(obj[symbol], copies);
  }

  // Сохранение прототипа
  Object.setPrototypeOf(copiedObj, Object.getPrototypeOf(obj));
 
  return copiedObj;
}

// Эксперементы
//создаем объект со всеми видами свойств
const originalObj = {
  a: 1, // обычное свойство
  b: {  //свойство объект
    c: 2,
    d: [3, 4],//свойство массив в свойсвте-объектке
  },
  c:[0,1,2,3,4,8,6,7,8],//свойство массив
  d: () => a+b.d[0], //функция
  e:Date(8.64e15), //Тип Date
  f:new Set(["a","b","c"]), //Тип Set
  g:new Map(), //Тип Map
  
};
//добавляем значения в Map оригинала
originalObj.g.set('a', 1);
originalObj.g.set('b', 2);
originalObj.g.set('c', 3);
originalObj.h = originalObj; // Создаем цикличную ссылку
//Копируем объект
const copiedObj = deepCopy(originalObj);
//Выводим в логи объекты
console.log(originalObj);
console.log(copiedObj);
//Меняем Set у оригинала
originalObj.g.set('a', 4);
originalObj.g.set('b', 6);
originalObj.g.set('c', 8);
//Повторно Выводим в логи объекты
console.log(originalObj);
console.log(copiedObj);
