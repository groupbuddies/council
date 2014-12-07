ActiveModel::Serializer.root = false
ActiveModel::ArraySerializer.root = false

ActiveModel::Serializer.setup do |config|
  config.embed = :ids
  config.embed_in_root = true
end
