class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.string :title, null: false, index: true, unique: true
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
