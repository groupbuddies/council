# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

users = [
  { first_name: 'Miguel',  last_name: 'Palhas',   email: 'mpalhas@groupbuddies.com' },
  { first_name: 'João',    last_name: 'Ferreira', email: 'joao@groupbuddies.com' },
  { first_name: 'Roberto', last_name: 'Machado',  email: 'roberto@groupbuddies.com' },
  { first_name: 'Luís',    last_name: 'Ferreira', email: 'zamith@groupbuddies.com' },
  { first_name: 'Bruno',   last_name: 'Azevedo',  email: 'bruno@groupbuddies.com' },
  { first_name: 'Ronaldo', last_name: 'Sousa',    email: 'ronaldo@groupbuddies.com' },
  { first_name: 'João',    last_name: 'Justo',    email: 'jjusto@groupbuddies.com' },
  { first_name: 'Gabriel', last_name: 'Poça',     email: 'gabriel@groupbuddies.com' }
]

users.each do |user_data|
  User.where(user_data).first_or_create(password: user_data[:email].split('@').first + 'password')
end
