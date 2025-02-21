# Gebruik de .NET 8.0 SDK
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Kopieer het projectbestand en herstel de afhankelijkheden
COPY Showcase-Profielpagina.csproj ./
RUN dotnet restore

# Kopieer de rest van de code en bouw de applicatie
COPY . ./
RUN dotnet publish -c Release -o out

# Gebruik een lichtgewicht runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out .

# Expose poort 5000
EXPOSE 5000

# Start de applicatie
ENTRYPOINT ["dotnet", "Showcase-Profielpagina.dll"]
