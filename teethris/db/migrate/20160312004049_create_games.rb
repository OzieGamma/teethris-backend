class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.integer :player1
      t.integer :player2
      t.boolean :active

      t.timestamps null: false
    end
  end
end
