class Colorize
  def self.rgb(text)
    '#' + (text.to_i(36) % 16_777_215).to_s(16).rjust(6, '0')
  end
end
