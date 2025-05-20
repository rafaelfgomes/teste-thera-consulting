import { Category } from '../../categories/entities/category.entity';
import { DataSource } from 'typeorm';

export async function seedCategories(dataSource: DataSource) {
  console.log('Iniciando o seeder de categorias...');

  const categoryRepository = dataSource.getRepository(Category);

  const count = await categoryRepository.count();

  if (count > 0) {
    console.log('Categorias já existem, pulando o seeder.');

    return;
  }

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
