class CreateNotes < ActiveRecord::Migration
  def change
    create_table :notes do |t|
      t.string :title, null: false, index: true
      t.text :body
      t.references :notebook, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
