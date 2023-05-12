const {faker}= require('@faker-js/faker');

class CategoriesService{

  constructor(){
    this.categories = [];
    this.generate();
  }

  generate(){
    const limit = 10;
    for (let i = 0; i < limit; i++) {
      this.categories.push({
        id: faker.datatype.uuid(),
        category: faker.commerce.productAdjective()
      });
    }
  }
  // lógica para crear un producto
  create(data){
    const newCategory = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.categories.push(newCategory);
    return newCategory;
  }
  // lógica find para mostrar categorias
  find(){
    return this.categories;
  }
  // lógica find para mostrar un solo producto
  findOne(id){
    return this.categories.find(item => item.id === id);
  }
  // lógica para actualizar
  update(id, changes){
    const index = this.categories.findIndex(item => item.id === id);
    if(index === -1){
      throw new Error('category not found');
    }
    const category = this.categories[index];
    this.categories[index] = {
      ...category,
      ...changes
    };
    return this.categories[index];
  }
  // lógica para eliminar
  delete(id){
    const index = this.categories.findIndex(item => item.id === id);
    if(index === -1){
      throw new Error('category not found');
    }
    this.categories.splice(index,1);
    return {id};
  }

}

module.exports = CategoriesService;
