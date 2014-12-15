class HQ::Team
  include HTTParty
  base_uri 'hq.groupbuddies.com'

  def self.all
    get_json('/')
  end

  def self.get_json(path)
    get(path).to_json
  end
end
