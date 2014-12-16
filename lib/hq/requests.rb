module Hq
  class Requests
    include HTTParty
    base_uri 'hq.groupbuddies.com'

    def self.get_json(path)
      get(path).to_json
    end
  end
end
