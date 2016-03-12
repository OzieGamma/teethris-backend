class AddRequestGameToPlayers < ActiveRecord::Migration
  def change
    add_column :players, :request_game, :boolean, default:false
  end
end
