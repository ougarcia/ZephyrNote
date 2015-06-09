class CreateNotebooks < ActiveRecord::Migration
  def change
    create_table :notebooks do |t|
      t.string :title, unique: true
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
