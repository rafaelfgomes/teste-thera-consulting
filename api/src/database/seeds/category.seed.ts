import { Category } from '../../categories/entities/category.entity';
import { DataSource } from 'typeorm';

export async function seedCategories(dataSource: DataSource) {
  console.log('Iniciando o seeder de categorias...');

  const categoryRepository = dataSource.getRepository(Category);

  const categories = [
    { name: 'Eletrônicos' },
    { name: 'Livros' },
    { name: 'Roupas' },
    { name: 'Laticínios' },
    { name: 'Higiene' },
    { name: 'Hortifruti' },
    { name: 'Bebidas' },
    { name: 'Utensílios' },
    { name: 'Frios' },
    { name: 'Limpeza' },
  ];

  await categoryRepository.insert(categories);

  console.log('Categorias criadas com sucesso!');
}
