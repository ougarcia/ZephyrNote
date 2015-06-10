json.(@notebook, :id, :title, :created_at, :updated_at)
json.notes do
  json.array! @notebook.notes do |note|
    json.(note, *Note.column_names)
  end
end
