class HQ::Team
  include HTTParty
  base_uri 'hq.groupbuddies.com'

  def self.all
    get_json('/')
  end

  private

  def self.get_json(path)
    self.get(path).to_json
  end
end
