# == Schema Information
#
# Table name: games
#
#  id         :integer          not null, primary key
#  player1    :integer
#  player2    :integer
#  active     :boolean
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Game < ActiveRecord::Base
  has_one :player1, :class_name => 'Player', :foreign_key => 'player1_id'
  has_one :player2, :class_name => 'Player', :foreign_key => 'player2_id'
end
