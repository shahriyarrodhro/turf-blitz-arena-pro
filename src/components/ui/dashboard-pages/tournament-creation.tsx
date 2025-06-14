
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trophy, Calendar, Users, DollarSign, MapPin, Plus, Edit, Settings, Upload } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export const TournamentCreation = () => {
  const [isCreateTournamentOpen, setIsCreateTournamentOpen] = useState(false);
  const [isManageTeamsOpen, setIsManageTeamsOpen] = useState(false);

  const myTournaments = [
    {
      id: '1',
      name: 'Champions Arena Cup 2024',
      format: 'Knockout',
      teams: 8,
      maxTeams: 16,
      prize: '৳25,000',
      entryFee: '৳1,500',
      startDate: '2024-12-20',
      endDate: '2024-12-25',
      status: 'upcoming',
      approvalStatus: 'approved'
    },
    {
      id: '2',
      name: 'New Year Football Festival',
      format: 'League',
      teams: 12,
      maxTeams: 12,
      prize: '৳50,000',
      entryFee: '৳2,000',
      startDate: '2025-01-01',
      endDate: '2025-01-15',
      status: 'registration',
      approvalStatus: 'pending'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'ongoing': return 'bg-green-100 text-green-700 border-green-200';
      case 'completed': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'registration': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getApprovalColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'pending': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-8">
      {/* Create Tournament Button */}
      <Card className="backdrop-blur-xl bg-gradient-to-br from-yellow-50/60 via-white/40 to-orange-50/60 border border-white/30 rounded-3xl shadow-xl">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-2">
                Tournament Management 🏆
              </h2>
              <p className="text-gray-600 text-lg">Create and manage tournaments at your turf</p>
            </div>
            <Dialog open={isCreateTournamentOpen} onOpenChange={setIsCreateTournamentOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white rounded-2xl px-8 py-3 shadow-xl transition-all duration-300 hover:scale-105">
                  <Trophy className="w-5 h-5 mr-2" />
                  Create Tournament
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Tournament</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="tournamentName">Tournament Name</Label>
                      <Input id="tournamentName" placeholder="e.g., Summer Cup 2024" className="rounded-xl" />
                    </div>
                    <div>
                      <Label htmlFor="format">Format</Label>
                      <Select>
                        <SelectTrigger className="rounded-xl">
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="knockout">Knockout</SelectItem>
                          <SelectItem value="league">League</SelectItem>
                          <SelectItem value="round-robin">Round Robin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="maxTeams">Maximum Teams</Label>
                      <Select>
                        <SelectTrigger className="rounded-xl">
                          <SelectValue placeholder="Select team limit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="8">8 Teams</SelectItem>
                          <SelectItem value="16">16 Teams</SelectItem>
                          <SelectItem value="32">32 Teams</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="entryFee">Entry Fee (৳)</Label>
                      <Input id="entryFee" type="number" placeholder="1500" className="rounded-xl" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="prizeMoney">Prize Money (৳)</Label>
                      <Input id="prizeMoney" type="number" placeholder="25000" className="rounded-xl" />
                    </div>
                    <div>
                      <Label htmlFor="registrationDeadline">Registration Deadline</Label>
                      <Input id="registrationDeadline" type="date" className="rounded-xl" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input id="startDate" type="date" className="rounded-xl" />
                    </div>
                    <div>
                      <Label htmlFor="endDate">End Date</Label>
                      <Input id="endDate" type="date" className="rounded-xl" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Tournament Description</Label>
                    <Textarea id="description" placeholder="Describe your tournament..." className="rounded-xl" />
                  </div>

                  <div>
                    <Label htmlFor="rules">Tournament Rules</Label>
                    <Textarea id="rules" placeholder="List tournament rules and regulations..." className="rounded-xl" />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsCreateTournamentOpen(false)} className="rounded-xl">
                      Cancel
                    </Button>
                    <Button onClick={() => setIsCreateTournamentOpen(false)} className="rounded-xl bg-yellow-600 hover:bg-yellow-700">
                      Submit for Approval
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* My Tournaments */}
      <Card className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-3xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-gray-800 flex items-center text-xl">
            <Trophy className="w-6 h-6 mr-3 text-emerald-600" />
            My Tournaments
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {myTournaments.map((tournament) => (
            <div key={tournament.id} className="p-6 bg-white/50 rounded-2xl border border-white/20 backdrop-blur-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{tournament.name}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{tournament.teams}/{tournament.maxTeams} teams</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-1" />
                      <span>Prize: {tournament.prize}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{tournament.startDate} - {tournament.endDate}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <Badge className={getApprovalColor(tournament.approvalStatus)}>
                    {tournament.approvalStatus}
                  </Badge>
                  <Badge className={getStatusColor(tournament.status)}>
                    {tournament.status}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-gray-50 p-3 rounded-xl">
                  <p className="text-xs text-gray-600">Format</p>
                  <p className="font-medium text-gray-800">{tournament.format}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl">
                  <p className="text-xs text-gray-600">Entry Fee</p>
                  <p className="font-medium text-gray-800">{tournament.entryFee}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl">
                  <p className="text-xs text-gray-600">Prize Pool</p>
                  <p className="font-medium text-gray-800">{tournament.prize}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline" className="rounded-xl">
                  <Edit className="w-3 h-3 mr-1" />
                  Edit Details
                </Button>
                <Dialog open={isManageTeamsOpen} onOpenChange={setIsManageTeamsOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">
                      <Users className="w-3 h-3 mr-1" />
                      Manage Teams
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Manage Tournament Teams - {tournament.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      {/* Team Registration List */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Registered Teams</h3>
                        <div className="space-y-3">
                          {Array.from({ length: tournament.teams }, (_, i) => (
                            <div key={i} className="p-4 bg-gray-50 rounded-xl flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">Team {i + 1}</h4>
                                <p className="text-sm text-gray-600">Captain: Player {i + 1}</p>
                                <p className="text-xs text-gray-500">Registered on: 2024-12-{10 + i}</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge className="bg-emerald-100 text-emerald-700">Confirmed</Badge>
                                <Button size="sm" variant="outline" className="rounded-lg">
                                  View Details
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Add Team Manually */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Add Team Manually</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="teamName">Team Name</Label>
                            <Input id="teamName" placeholder="Enter team name" className="rounded-xl" />
                          </div>
                          <div>
                            <Label htmlFor="captainName">Captain Name</Label>
                            <Input id="captainName" placeholder="Enter captain name" className="rounded-xl" />
                          </div>
                        </div>
                        <Button className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Team
                        </Button>
                      </div>

                      {/* Tournament Bracket */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Tournament Bracket</h3>
                        <div className="p-4 bg-gray-50 rounded-xl">
                          <p className="text-gray-600 text-center">Bracket will be generated once registration closes</p>
                          <div className="flex justify-center mt-4">
                            <Button variant="outline" className="rounded-xl">
                              <Upload className="w-4 h-4 mr-2" />
                              Upload Custom Bracket
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button size="sm" variant="outline" className="rounded-xl">
                  <Settings className="w-3 h-3 mr-1" />
                  Settings
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
