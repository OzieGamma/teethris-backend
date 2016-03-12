# == Schema Information
#
# Table name: players
#
#  id           :integer          not null, primary key
#  name         :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  request_game :boolean          default("f")
#

class Player < ActiveRecord::Base
end
