require 'hq'

class Hq::Team
  include HTTParty
  base_uri 'hq.groupbuddies.com'

  def self.all
    get_json('/members')
  end

  def self.get_json(path)
    get(path).to_json
  end
  private_class_method :get_json
end
