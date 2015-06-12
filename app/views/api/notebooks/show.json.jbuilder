json.(@notebook, :id, :title, :created_at, :updated_at)
json.notes do
  json.array! @notebook.notes do |note|
    json.(note, *Note.column_names)
    json.tags do
      json.array! note.tags do |tag|
        json.(tag, *Tag.column_names)
      end
    end
  end
end
